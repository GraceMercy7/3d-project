import * as THREE from 'three';

export function createProduct() {
    // Create a group to hold all chair parts
    const chair = new THREE.Group();

    // Materials
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x808080,
        metalness: 0.2,
        roughness: 0.8,
        clearcoat: 0.3,
        clearcoatRoughness: 0.25
    });

    // Chair seat
    const seatGeometry = new THREE.BoxGeometry(2, 0.2, 2);
    const seat = new THREE.Mesh(seatGeometry, material);
    seat.position.y = 1;
    seat.castShadow = true;
    seat.receiveShadow = true;
    seat.userData = { name: 'Chair Seat' };
    chair.add(seat);

    // Chair back
    const backGeometry = new THREE.BoxGeometry(2, 1.5, 0.2);
    const back = new THREE.Mesh(backGeometry, material);
    back.position.set(0, 1.75, -0.9);
    back.castShadow = true;
    back.receiveShadow = true;
    back.userData = { name: 'Chair Back' };
    chair.add(back);

    // Chair legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
    const legPositions = [
        [-0.8, 0.5, -0.8],
        [0.8, 0.5, -0.8],
        [-0.8, 0.5, 0.8],
        [0.8, 0.5, 0.8]
    ];

    legPositions.forEach((pos, index) => {
        const leg = new THREE.Mesh(legGeometry, material);
        leg.position.set(...pos);
        leg.castShadow = true;
        leg.receiveShadow = true;
        leg.userData = { name: `Chair Leg ${index + 1}` };
        chair.add(leg);
    });

    // Add subtle animation to the chair
    chair.userData.animate = function(time) {
        // Add a gentle floating motion
        chair.position.y = Math.sin(time * 0.5) * 0.05;
    };

    return chair;
} 