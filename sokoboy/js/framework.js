(function () { 
    var fw = {};

    fw.image = function (src) {
        var img = document.createElement('img');
        img.src = src;
        return img;
    };

    fw.load = function (images, onLoad, onProgress) {
        var loaded = 0;

        function checkLoaded() {
            if (onProgress) {
                onProgress(loaded / images.length * 100);
            }
            if (loaded === images.length) { 
                onLoad();
            }
        }

        for (var i = 0; i < images.length; i++) {
            if (images[i].width > 0) { 
                loaded++;
            } else { 
                images[i].addEventListener('load', function () {
                    loaded++;
                    checkLoaded();
                });
            }
        }
        checkLoaded();
    };

    var pressedKeys = {};
    var scrollBlockedKeys = { 37: true, 38: true, 39: true, 40: true };
    document.onkeydown = function (e) {
        pressedKeys[e.which] = true;
        if (scrollBlockedKeys[e.which]) e.preventDefault();
    };

    document.onkeyup = function (e) {
        delete pressedKeys[e.which];
    };

    fw.pressedKeys = pressedKeys;

    fw.isDown = function (key) {
        return pressedKeys[key];
    };

    fw.entity = function (parent, methods) { 
        var i;
        if(!methods){ 
            methods = parent;
            parent = null;
        }

        var customInit = methods.init;

        function Entity(x, y) {
            this.x = x;
            this.y = y;
            this.init();
        }

        function Parent() {}

        if (parent) {
            Parent.prototype = parent.prototype;
        }

        Entity.prototype = new Parent();
    
        for (method in methods) {
            if(method[0]!=='$') {
                Entity.prototype[method] = methods[method];
            }
        }

        Entity.prototype.init = function () { 
            if (parent) {
                parent.prototype.init.call(this);
            }
            if (customInit) {
                customInit.call(this);
            }
        };

        Entity.prototype._events = {};
     
        if (parent) {
            for (method in parent.prototype._events) {
                Entity.prototype._events[method] = parent.prototype._events[method].slice(0);
            }
        }
        for (method in methods) {
            if (method[0] === '$') {
                var event = method.substring(1);
                if (!Entity.prototype._events[event]) {
                    Entity.prototype._events[event] = [];
                }
                Entity.prototype._events[event].push(methods[method]);
            }
        }

        Entity.prototype.fire = function (event, data) {
            var listeners = this._events[event];
            if (listeners) {
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i].call(this, data);
                }
            }
        };

        return Entity;
    };

    function createMask(img) {
        var canvas = document.createElement('canvas'); 
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0); 

        var data = ctx.getImageData(0, 0, img.width, img.height).data; 

        img.isTransparent = function (x, y) {
            return data[(y * img.width + x) * 4 + 3] === 0;
        };
    }

    fw.rectIntersect = function (x1, y1, w1, h1, x2, y2, w2, h2) { 
        return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
    };

    function ensureHasMask(img) {
        if (!img.isTransparent) { 
            createMask(img);
        }
    }

    fw.maskIntersect = function (mask1, x1, y1, mask2, x2, y2) { 
        if (fw.rectIntersect(x1, y1, mask1.width, mask1.height, x2, y2, mask2.width, mask2.height)) {
            ensureHasMask(mask1);
            ensureHasMask(mask2);

            var left = Math.max(x1, x2);
            var top = Math.max(y1, y2);
            var right = Math.min(x1 + mask1.width, x2 + mask2.width);
            var bottom = Math.min(y1 + mask1.height, y2 + mask2.height);
            for (var i = left; i < right; i++) {
                for (var j = top; j < bottom; j++) {
                    if (!mask1.isTransparent(i - x1, j - y1) && !mask2.isTransparent(i - x2, j - y2)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    function key(x, y) {
        return x + ',' + y;
    }

    fw.createIndex = function (scene, size) { 
        if (!size) {
            size = 64;
        }
        var grid = {};
        scene.forEach(function(entity){
            if (!entity.getLeft) {
                return;
            }
            var left = entity.getLeft();
            var top = entity.getTop();
            var cellLeft = Math.floor(left / size);
            var cellTop = Math.floor(top / size);
            var cellRight = Math.floor((left + entity.getWidth()) / size);
            var cellBottom = Math.floor((top + entity.getHeight()) / size);

            for (var x = cellLeft; x <= cellRight; x++) {
                for (var y = cellTop; y <= cellBottom; y++) {
                    var cellKey = key(x, y);
                    var cellData = grid[cellKey]; 
                    if (!cellData) { 
                        grid[cellKey] = [entity]; 
                    } else {
                        cellData.push(entity); 
                    }
                }
            }
        });

        return {
            query: function (left, top, width, height) {
                var cellLeft = Math.floor(left / size);
                var cellTop = Math.floor(top / size);
                var cellRight = Math.floor((left + width) / size);
                var cellBottom = Math.floor((top + height) / size);

                var result = [];
                for (var x = cellLeft; x <= cellRight; x++) {
                    for (var y = cellTop; y <= cellBottom; y++) {
                        var cellKey = key(x, y);
                        var cellData = grid[cellKey]; 
                        if (!cellData) { 
                            continue;
                        }
                        for (var j = 0; j < cellData.length; j++) { 
                            var entity = cellData[j];
                            if (result.indexOf(entity) !== -1) { 
                                continue;
                            }
                            if (!fw.rectIntersect(left, top, width, height, entity.getLeft(), entity.getTop(), entity.getWidth(), entity.getHeight())) {
                                continue; 
                            }
                            result.push(entity);
                        }
                    }
                }
                return result;
            },
            hasCollision: function (entity, tipus, xShift, yShift) {
                xShift = xShift || 0;
                yShift = yShift || 0;
                var l = true;
                var utkozesek = this.query(entity.getLeft() + xShift, entity.getTop() + yShift, entity.getWidth(), entity.getHeight());
                for (var i = 0; i < utkozesek.length; i++) {
                    if (utkozesek[i] instanceof tipus && utkozesek[i] !== entity) {
                
                        if(entity instanceof Bullet &&  utkozesek[i] instanceof Box && utkozesek[i].exp === false ) {
                            utkozesek[i].explosion();

                        } else if(entity instanceof Guy && utkozesek[i] instanceof Box) {
                            l = utkozesek[i].move(xShift, yShift);
                            if (!l) {
                                entity.push = 1;
                            }
                
                        } else if(entity instanceof Bullet &&  utkozesek[i] instanceof Box && utkozesek[i].exp === true) {
                            return false;
                        }
                        if(l) return true;
                    }
                }
                return false;
            }
        };
    };

    fw.EntityWithSprite = fw.entity({
        init: function () {
            this.image = null;
            this.imageRows = 1;
            this.imageColumns = 1;
            this.imageRow = 0;
            this.imageColumn = 0;
            this.imageScaleX = 1;
            this.imageScaleY = 1;
        },
        $draw: function (ctx) {
            if (!this.image) {
                return;
            }
            ctx.drawImage(this.image, this.getSourceLeft(), this.getSourceTop(), this.getSourceWidth(), this.getSourceHeight(), this.getTargetLeft(), this.getTargetTop(), this.getTargetWidth(), this.getTargetHeight()); //felrajzoljuk a hőst
        },
        getLeft: function () {
            return this.getTargetLeft();
        },
        getTop: function () {
            return this.getTargetTop();
        },
        getWidth: function () {
            return this.getTargetWidth();
        },
        getHeight: function () {
            return this.getTargetHeight();
        },
        getSourceLeft: function () {
            return this.image.width / Math.floor(this.imageColumns) * Math.floor(this.imageColumn);
        },
        getSourceTop: function () {
            return this.image.height / this.imageRows * this.imageRow;
        },
        getSourceWidth: function () {
            return this.image.width / this.imageColumns;
        },
        getSourceHeight: function () {
            return this.image.height / this.imageRows;
        },
        getTargetLeft: function () {
            return this.x;
        },
        getTargetTop: function () {
            return this.y;
        },
        getTargetWidth: function () {
            return this.getSourceWidth() * this.imageScaleX;
        },
        getTargetHeight: function () {
            return this.getSourceHeight() * this.imageScaleY;
        }
    });

    fw.Scene = function () {
        this._nextId=0;
        this._entities = {};
        this._entitiesByEvent = {};
    };

    fw.Scene.prototype = {
        add:function(){
            for(var i=0; i < arguments.length; i++){
                var entity = arguments[i];
                var id = this._nextId++;
                entity.id = id;
                entity.scene = this;
                this._entities[id] = entity;

                for (var event in entity._events) {
                    if (!this._entitiesByEvent[event]) {
                        this._entitiesByEvent[event] = {};
                    }
                    this._entitiesByEvent[event][id] = entity;
                }
            }
        },

        remove:function(entity){
            delete this._entities[entity.id];
            for (var event in entity._events) {
                delete this._entitiesByEvent[event][entity.id];
            }
        },

        forEach:function(callback){
            for(var i in this._entities){
                callback(this._entities[i]);
            }
        },

        fire: function (event, param) {
            var entitasok = this._entitiesByEvent[event];
            if (entitasok) {
                for (var id in entitasok) {
                    entitasok[id].fire(event, param);
                }
            }
        }
    };

    window.fw = fw;
})();