function generateSpheres(world, x_min, x_max, z_min, z_max, y, rad, c1, c2) {
    const Sphere = raytracer.surfaces.Sphere;
    const targetPoint = new raytracer.point3(4, 0.2, 0);
    
    for (let a = x_min; a < x_max; a++) {
        for (let b = z_min; b < z_max; b++) {
            let choose_mat = sgxRand();
            let center = new raytracer.point3(a + 0.9*sgxRand(), y, b + 0.9*sgxRand());

            // if ((center - point3(4, 0.2, 0)).length() > 0.9) {
            if (center.getDistance(targetPoint) > 0.9) {
                // shared_ptr<material> sphere_material;

                if (choose_mat < c1) {
                    // diffuse
                    const albedo = sgxPoint3f.random();
                    // color3::random() * color3::random();
                    // sphere_material = make_shared<lambertian>(albedo);
                    // world.add(make_shared<sphere>(center, 0.2, sphere_material));

                    const tmpMaterial = new raytracer.materials.Lambertian(albedo);
                    world.add(new Sphere(center, rad, tmpMaterial));
                
                } else if (choose_mat < c2) {
                    // metal
                    const albedo = sgxPoint3f.random(0.5, 1);
                    // auto albedo = color3::random(0.5, 1);
                    const fuzz = sgxRand() / 2;

                    const tmpMaterial  = new raytracer.materials.Metal(albedo, fuzz);

                    world.add(new Sphere(center, rad, tmpMaterial));
                } else {
                    // glass
                    // sphere_material = make_shared<dielectric>(1.5);
                    const tmpMaterial   = new raytracer.materials.Dielectric(1.5);

                    world.add(new Sphere(center, rad, tmpMaterial));
                }
            }
        }
    }
}


function makeCustomWorld() {
    const Sphere = raytracer.surfaces.Sphere;
    const Cube = raytracer.surfaces.Cube;
    let world = new raytracer.hittable.HittableList();

/*
    const ground_color = [0.549, 0.424, 0.322]
    const ground_material = new raytracer.materials.Lambertian(new raytracer.color3(...ground_color));
    world.add(new Sphere(new raytracer.point3(0,-1000, 0), 1000, ground_material));
    */
    
    //const ground_color = [0.549, 0.424, 0.322]
    const ground_material = new raytracer.surfaces.LambertianTexture(
        new raytracer.surfaces.CheckerTexture(0.32,
            new raytracer.surfaces.SolidColor(0.549, 0.424, 0.322),
            new raytracer.surfaces.SolidColor(0.9, 0.9, 0.9)
        )
    );
    world.add(new Sphere(new raytracer.point3(0,-1000, 0), 1000, ground_material));

    
    generateSpheres(world, -11, 11, -11, 11, 0.2, 0.2, 0.6, 0.8);
    
    generateSpheres(world, -5, 5, -5, 5, 0.6, 0.2, 0.2, 0.4);
    

    const material1 = new raytracer.materials.Dielectric(1.5);
    world.add(new Cube(new raytracer.point3(3, 1, 0), 1, material1));

    const material2 = new raytracer.materials.Lambertian(new raytracer.color3(0.4, 0.2, 0.1));
    world.add(new Sphere(new raytracer.point3(-4, 1, -5), 0.5, material2));

    const material3 = new raytracer.materials.Metal(new raytracer.color3(0.7, 0.6, 0.5), 0);
    world.add(new Sphere(new raytracer.point3(0, 1, 3), 0.5, material3));


    return { world };
}
