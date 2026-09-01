// --- 1. Three.js 3D Background Engine ---
function init3DBackground() {
    const canvas = document.querySelector('#bg-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    // Main Interactive 3D Geometry (TorusKnot)
    const geometry = new THREE.TorusKnotGeometry(10, 2.5, 120, 16);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00adb5,
        wireframe: true,
        roughness: 0.2,
        metalness: 0.8
    });
    const main3DObject = new THREE.Mesh(geometry, material);
    scene.add(main3DObject);

    // Background Starfield Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1800;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 160;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.12,
        color: 0xffffff,
        transparent: true,
        opacity: 0.7
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting setup
    const pointLight = new THREE.PointLight(0x00adb5, 2.5);
    pointLight.position.set(25, 25, 25);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(pointLight, ambientLight);

    // Mouse Tracking Logic
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowHalfX) * 0.0008;
        mouseY = (e.clientY - windowHalfY) * 0.0008;
    });

    // Scroll Rotation Sync
    document.addEventListener('scroll', () => {
        const top = document.body.getBoundingClientRect().top;
        main3DObject.rotation.x = top * -0.001;
        main3DObject.rotation.y = top * -0.001;
    });

    // Render Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        main3DObject.rotation.z += 0.002;
        particlesMesh.rotation.y -= 0.0003;

        // Smooth Mouse Rotation Interpolation
        main3DObject.rotation.y += 0.05 * (mouseX - main3DObject.rotation.y);
        main3DObject.rotation.x += 0.05 * (mouseY - main3DObject.rotation.x);

        renderer.render(scene, camera);
    }

    animate();

    // Window Resize Handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- 2. Mobile Navbar Toggle ---
document.addEventListener('DOMContentLoaded', () => {
    init3DBackground();

    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.navbar');

    if (menuBtn && navbar) {
        menuBtn.onclick = () => {
            menuBtn.classList.toggle('fa-xmark');
            navbar.classList.toggle('active');
        };

        document.querySelectorAll('.navbar a').forEach(link => {
            link.onclick = () => {
                menuBtn.classList.remove('fa-xmark');
                navbar.classList.remove('active');
            };
        });
    }
});

// --- 3. Scroll Reveal Animation ---
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// --- 4. Typing Animation ---
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const texts = ["Web Developer", "CSE Student", "Three.js Enthusiast", "Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 300;
        }

        setTimeout(type, speed);
    }

    type();
}

document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X inside card
    const y = e.clientY - rect.top;  // Mouse Y inside card
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt degrees calculation
    const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
    const rotateY = ((x - centerX) / centerX) * 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  });

  // Mouse leave response - Reset back to original position
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = `transform 0.5s ease`;
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = `none`; // Instant reaction on hover
  });
});