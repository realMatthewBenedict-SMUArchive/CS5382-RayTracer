import { vec3 } from "../modules/vec3.js";

class Texture {
    constructor() {
    }
}

class SolidColor extends Texture {
    constructor(red, green, blue) {
        super();
        this.albedo = new vec3(red, green, blue);
    }
    
    value(u, v, point) {
        return this.albedo;
    }
}

class CheckerTexture extends Texture {
    constructor(scale, even, odd) {
        super();
        this.inv_scale = 1.0 / scale;
        this.even = even;
        this.odd = odd;
    }
    
    value(u, v, point) {
        const inv_scale = this.inv_scale;
        const xInt = Math.floor(inv_scale * point.x);
        const yInt = Math.floor(inv_scale * point.y);
        const zInt = Math.floor(inv_scale * point.z);
        
        const isEven = (xInt + yInt + zInt) % 2 == 0;
        
        return isEven ? this.even.value(u, v, point) : this.odd.value(u, v, point);
    }
}

export { SolidColor, CheckerTexture };
