export function setupCameraAnimation(camera, controls) {
    let autoRotate = true;
    let rotationSpeed = 0.5;
    let lastTime = 0;

    // Function to update camera position
    function updateCamera(time) {
        if (!autoRotate) return;

        const delta = (time - lastTime) / 1000;
        lastTime = time;

        // Calculate new camera position using polar coordinates
        const radius = Math.sqrt(
            camera.position.x * camera.position.x +
            camera.position.z * camera.position.z
        );
        const angle = Math.atan2(camera.position.z, camera.position.x) + rotationSpeed * delta;

        camera.position.x = radius * Math.cos(angle);
        camera.position.z = radius * Math.sin(angle);
        camera.lookAt(0, 0, 0);
    }

    // Toggle auto-rotation when user interacts with controls
    controls.addEventListener('start', () => {
        autoRotate = false;
    });

    controls.addEventListener('end', () => {
        autoRotate = true;
    });

    // Add animation to the main animation loop
    return updateCamera;
} 