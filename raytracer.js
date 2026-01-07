import * as ppm from "./modules/ppm.js";
import * as utils from "./modules/utils.js";
import { vec3, point3, color3 } from "./modules/vec3.js";
//
import * as hittable from "./surfaces/hittable.js";
import { Cube } from "./surfaces/cube.js";
import { Sphere } from "./surfaces/sphere.js";
import * as materials from "./materials/materials.js";
//
import * as s02 from "./book/s02.js";
import * as s04 from "./book/s04.js";
import * as s05 from "./book/s05.js";
import * as s06 from "./book/s06.js";
import * as s07 from "./book/s07.js";
import * as s08 from "./book/s08.js";
import * as s10 from "./book/s10.js";
import * as s12 from "./book/s12.js";
import * as custom_s15 from "./book/custom_s15.js";

import * as lambert from "./materials/lambertian.js";
import * as texture from "./surfaces/texture.js";

console.log(lambert.LambertianTexture);

const raytracer = {
    // Classes for general use
    ppm,
    utils,
    vec3,
    point3,
    color3,

    materials,
    hittable,

    surfaces: {
        Cube: Cube,
        Sphere: Sphere,
        LambertianTexture: lambert.LambertianTexture,
        SolidColor: texture.SolidColor,
        CheckerTexture: texture.CheckerTexture,
    },
    
    // The sections within the book
    s02,
    s04,
    s05,
    s06,
    s07,
    s08,
    s10,
    s12,
    custom_s15,
}

console.log(raytracer)


export { raytracer }
