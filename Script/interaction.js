import * as THREE from 'three';

export function setupInteraction(scene, camera, renderer, product) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedObject = null;
    const floatingPanel = document.getElementById('floating-panel');

    // Function to show floating panel
    function showFloatingPanel(text, x, y) {
        floatingPanel.textContent = text;
        floatingPanel.style.left = `${x}px`;
        floatingPanel.style.top = `${y}px`;
        floatingPanel.classList.add('visible');

        // Hide panel after 2 seconds
        setTimeout(() => {
            floatingPanel.classList.remove('visible');
        }, 2000);
    }

    // Function to handle mouse movement
    function onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster
        raycaster.setFromCamera(mouse, camera);

        // Find intersections
        const intersects = raycaster.intersectObjects(product.children, true);

        // Reset previous selection
        if (selectedObject) {
            selectedObject.material.emissive.setHex(0x000000);
            selectedObject.material.opacity = 1;
        }

        // Handle new selection
        if (intersects.length > 0) {
            selectedObject = intersects[0].object;
            selectedObject.material.emissive.setHex(0x333333);
        } else {
            selectedObject = null;
        }
    }

    // Function to handle mouse clicks
    function onClick(event) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(product.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            
            // Animate the clicked object
            const originalScale = clickedObject.scale.clone();
            clickedObject.scale.multiplyScalar(1.2);
            
            // Show floating panel with part name
            showFloatingPanel(clickedObject.userData.name || 'Unknown Part', event.clientX, event.clientY);
            
            // Reset after animation
            setTimeout(() => {
                clickedObject.scale.copy(originalScale);
            }, 200);
        }
    }

    // Add event listeners
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);
} 