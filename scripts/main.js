console.log("STARTING DEBUGGING");

// Loading Componets
async function loadComponents() {
    // console.log("[1] Starting Component Loading ...");
    try {

        let headerHTML = '';
        try {
            const resp = await fetch('./components/header.html');
            if (resp.ok) {
                headerHTML = await resp.text();
            } else {
                const fallbackResp = await fetch('../components/header.html');
                headerHTML = await fallbackResp.text();
            }
        } catch (err) {
            console.error('Header not found in either location');
        }

        document.getElementById('header-container').innerHTML = headerHTML;


        // const headerHTML = await fetch('/components/header.html')
        //     .then(res=> res.ok ? res.text() : fetch('../components/header.html'))
        //     .then(res=> {
        //         if(!res.ok) throw new Error ('Header not Found');
        //         return res.text();
        //     })
        //     .catch(err => {
        //     console.error(err.message);
        //     return'';
        //     });
        // Loading Header ...
        // const headerHTML = await (await fetch('./components/header.html').catch(() => fetch('../components/header.html'))).text();
        // const headerResp = await fetch('./components/header.html');
        // const headerHTML = await headerResp.text();
        // console.log("[2] Header HTML loaded successfully");

        

        // Check if Menu Button exists in DOM
        const menuButtonCheck1 = document.querySelector('.mobile-menu-button');
        // console.log("[3] Button exists after insertion?", !!menuButtonCheck1);

        initMobileMenu();

        // Loading Footer ...
        let footerHTML = '';
        try {
            const resp = await fetch('./components/footer.html');
            if (resp.ok) {
                footerHTML = await resp.text();
            } else {
                const fallbackResp = await fetch('../components/footer.html');
                footerHTML = await fallbackResp.text();
            }
        } catch (err) {
            console.error('Footer not found in either location');
        }
        // const footerResp = await fetch('./components/footer.html');
        // const footerHTML = await footerResp.text();
        // console.log("[4] Footer HTML loaded successfully");

        document.getElementById('footer-container').innerHTML = footerHTML;
        updateCopyrightYear();

    } catch (error) {
        // console.error("[ERROR] Loading components failed:", error);
    }

}

function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Mobile menu toggle
function initMobileMenu() {
    // console.log("[5] Initializing mobile menu...");
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    // const menuButton = document.querySelector('.mobile-menu-button');

    if (!menuBtn || !mobileNav) {
        console.error('Mobile menu elements not found');
        return;
    }

    const menuIcon = menuBtn.querySelector('.menu-icon');
    const closeIcon = menuBtn.querySelector('.close-icon');

    function toggleMenu() {
        const isOpen = mobileNav.classList.toggle('open');
        menuIcon.style.display = isOpen ? 'none' : 'block';
        closeIcon.style.display = isOpen ? 'block' : 'none';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    // Submenu toggle
    document.querySelectorAll('.has-submenu > .submenu-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth < 993) {
                e.preventDefault();
                this.nextElementSibling.classList.toggle('show');
            }
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-content') && mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });

    menuBtn.addEventListener('click', toggleMenu);
    // console.log('Mobile menu setup complete');


    // const navMenu = document.querySelector('.nav-menu');

    // console.log("[6] Menu Button Found", menuButton);
    // console.log("[7] Nav menu Found", navMenu);

    // if (menuButton && navMenu) {
    //     menuButton.addEventListener('click', () => {
    //         console.log("[9] Button Clicked! Toggling Menu");

    //         navMenu.classList.toggle('active');


    //     });
    // } else {
    //     console.warn("[WARNING] Missing elements", {
    //         button: menuButton,
    //         menu: navMenu
    //     })
    // }
}

// 3. Check viewport dimensions
console.log("[9] Current viewport width:", window.innerWidth);
// console.log("[10] Device is mobile?", window.innerWidth < 768);

// 4. Run everything
document.addEventListener('DOMContentLoaded', () => {
    initFooterAccordions();
    //   console.log("[11] DOM fully loaded");
    loadComponents().then(() => {
        // console.log("[12] Components loaded completely");
    });
});

// 5. Add resize listener for debugging
window.addEventListener('resize', () => {
    //   console.log("[RESIZE] New viewport width:", window.innerWidth);
});


// Add this to your existing main.js

// function initFooterAccordions() {
//     const accordions = document.querySelectorAll('.mobile-accordion');
//     if (window.innerWidth < 768) {
//         accordions.forEach(accordion => {
//             const toggle = accordion.querySelector('.accordion-toggle');
//             toggle.addEventListener('click', () => {
//                 accordion.classList.toggle('active');
//             });
//         });
//     }
// }

function initFooterAccordions() {
    const accordions = document.querySelectorAll('.mobile-accordion');

    function setupAccordions() {
        accordions.forEach(accordion => {
            const toggle = accordion.querySelector('.accordion-toggle');
            const menu = accordion.querySelector('.menu-list');
            toggle.removeEventListener('click', toggleAccordion);
            

            if (window.innerWidth < 768) {
                accordion.classList.remove('active');
                toggle.addEventListener('click', toggleAccordion);
            } else {
                accordion.classList.add('active');
            }
        });
    }

    function toggleAccordion(e) {
        const accordion = e.currentTarget.closest('.mobile-accordion');
        accordion.classList.toggle('active');
    }


    setupAccordions();


    window.addEventListener('resize', setupAccordions);
}


document.addEventListener('DOMContentLoaded', initFooterAccordions);




// Update your loadComponents function

// async function loadComponents() {
//     try {
//         const footerResp = await fetch('./components/footer.html');
//         document.getElementById('footer-container').innerHTML = await footerResp.text();

//         initMobileMenu();
//         initFooterAccordions();
//     } catch (error) {
//         console.error('Error loading components:', error);
//     }
// }



// Handle window resize for accordions

// window.addEventListener('resize', () => {
//     const accordions = document.querySelectorAll('.mobile-accordion');
//     const isMobile = window.innerWidth < 768;

//     accordions.forEach(accordion => {
//         if (isMobile) {
//             const toggle = accordion.querySelector('.accordion-toggle');
//             toggle.addEventListener('click', () => {
//                 accordion.classList.toggle('active');
//             });
//         } else {
//             accordion.classList.remove('active');
//             const toggle = accordion.querySelector('.accordion-toggle');
//             toggle.replaceWith(toggle.cloneNode(true));
//         }
//     });
// });



// document.addEventListener('DOMContentLoaded', () => {
//     const menuButton = document.querySelector('.mobile-menu-button');
//     const menu = document.querySelector('.nav-menu');

//     if (menuButton && menu) {
//         menuButton.addEventListener('click', () => {
//             menu.classList.toggle('active');

//             const hamburger = menuButton.querySelector('.hamburger');
//             hamburger.textContent = menu.classList.contains('active') ? '✕' : '☰';
//         });
//     }
// });