document.addEventListener('DOMContentLoaded', () => {
    let storeItems = [
        { id: 1, name: 'Featured App', description: 'Check out our app of the day', category: 'apps', image: 'https://attractgroup.com/wp-content/uploads/2023/11/A-conceptual-landscape-image-of-a-Property-Management-app.-The-app-interface-showcases-icons-and-features-related-to-real-estate-management-such-as-b.png', downloadUrl: 'https://play.google.com/store' },
        { id: 2, name: 'New Game', description: 'Explore the latest game release', category: 'games', image: 'https://www.grantthornton.in/globalassets/1.-member-firms/india/new-homepage/media/1.-hero-banners_repeat-visits/1440x600px_hero_banner_adobestock_637887593.jpg', downloadUrl: 'https://poki.com/en/online' },
        { id: 3, name: 'Top Movie', description: 'Watch the trending movie', category: 'movies', image: 'https://us.123rf.com/450wm/vectorpocket/vectorpocket1801/vectorpocket180100093/92747936-cinema-blue-background-with-3d-realistic-objects-popcorn-tape-tickets-and-clapperboard-vector.jpg?ver=6', downloadUrl: 'https://vegamovies3.org/' },
        { id: 4, name: 'Updates', description: 'See what\'s new in your library', category: 'apps', image: 'https://media.istockphoto.com/id/1146311500/photo/update-button-on-computer-keyboard.jpg?s=612x612&w=0&k=20&c=FE0PVTVXdjAhO7353-IBP6XYQ-YrLn1ccWFHmlKsT7g=', downloadUrl: 'https://discord.gg/invite/plusenodes' }
    ];

    const recentReleases = [
        
    ];

    const trendingItems = [
        ,
    ];

    const storeItemsContainer = document.getElementById('store-items');
    const appsItemsContainer = document.getElementById('apps-items');
    const gamesItemsContainer = document.getElementById('games-items');
    const moviesItemsContainer = document.getElementById('movies-items');
    const releasesGrid = document.querySelector('.releases-grid');
    const trendingGrid = document.querySelector('.trending-grid');
    const existingItemsContainer = document.getElementById('existing-items');

    function createStoreItem(item) {
        const element = document.createElement('div');
        element.classList.add('card');
        element.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px;">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <a href="${item.downloadUrl}" download class="download-link">Download</a>
        `;
        return element;
    }

    function createItemElement(item, className) {
        const element = document.createElement('div');
        element.classList.add(className);
        element.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h4>${item.title}</h4>
            <a href="${item.downloadUrl}" download class="download-link">Download</a>
        `;
        return element;
    }

    function renderStoreItems() {
        storeItemsContainer.innerHTML = '';
        appsItemsContainer.innerHTML = '';
        gamesItemsContainer.innerHTML = '';
        moviesItemsContainer.innerHTML = '';

        storeItems.forEach(item => {
            const storeItem = createStoreItem(item);
            storeItemsContainer.appendChild(storeItem);

            switch (item.category) {
                case 'apps':
                    appsItemsContainer.appendChild(createStoreItem(item));
                    break;
                case 'games':
                    gamesItemsContainer.appendChild(createStoreItem(item));
                    break;
                case 'movies':
                    moviesItemsContainer.appendChild(createStoreItem(item));
                    break;
            }
        });
    }

    function renderExistingItems() {
        existingItemsContainer.innerHTML = '<h3>Existing Items</h3>';
        storeItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('existing-item');
            itemElement.innerHTML = `
                <div class="existing-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="existing-item-actions">
                    <button class="edit-btn" data-id="${item.id}">Edit</button>
                    <button class="delete-btn" data-id="${item.id}">Delete</button>
                </div>
            `;
            existingItemsContainer.appendChild(itemElement);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                openEditModal(itemId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                deleteItem(itemId);
            });
        });
    }

    function openEditModal(itemId) {
        const item = storeItems.find(item => item.id === itemId);
        if (item) {
            document.getElementById('edit-item-id').value = item.id;
            document.getElementById('edit-item-name').value = item.name;
            document.getElementById('edit-item-description').value = item.description;
            document.getElementById('edit-item-image-url').value = item.image;
            document.getElementById('edit-item-category').value = item.category;
            document.getElementById('edit-item-modal').style.display = 'block';
        }
    }

    function deleteItem(itemId) {
        if (confirm('Are you sure you want to delete this item?')) {
            storeItems = storeItems.filter(item => item.id !== itemId);
            renderStoreItems();
            renderExistingItems();
        }
    }

    renderStoreItems();
    renderExistingItems();

    recentReleases.forEach(release => {
        releasesGrid.appendChild(createItemElement(release, 'release-item'));
    });

    trendingItems.forEach(item => {
        trendingGrid.appendChild(createItemElement(item, 'trending-item'));
    });

    // Handle navigation
    const navLinks = document.querySelectorAll('footer nav a');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active states
            navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // Show/hide tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${targetId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Copy and Download functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const content = document.getElementById(targetId).textContent;
            navigator.clipboard.writeText(content).then(() => {
                alert('Code copied to clipboard!');
            });
        });
    });

    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const content = document.getElementById(targetId).textContent;
            const filename = btn.getAttribute('data-filename');
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    });

    // Admin login functionality
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminTab = document.getElementById('admin-tab');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    let isAdminMode = false;

    adminLoginBtn.addEventListener('click', () => {
        adminLoginModal.style.display = 'block';
    });

    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;
        if (password === 'admin123') { // In a real application, use proper authentication
            isAdminMode = true;
            adminLoginModal.style.display = 'none';
            adminTab.classList.add('active');
            adminLoginBtn.style.display = 'none';
            adminLogoutBtn.style.display = 'block';
            renderExistingItems();
        } else {
            alert('Incorrect password');
        }
    });

    adminLogoutBtn.addEventListener('click', () => {
        isAdminMode = false;
        adminTab.classList.remove('active');
        adminLoginBtn.style.display = 'block';
        adminLogoutBtn.style.display = 'none';
    });

    // Add item form submission
    const addItemForm = document.getElementById('add-item-form');
    function handleFileUpload(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }
    addItemForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('item-name').value;
        const description = document.getElementById('item-description').value;
        const imageUrl = document.getElementById('item-image-url').value;
        const category = document.getElementById('item-category').value;
        const file = document.getElementById('item-file').files[0];

        let downloadUrl = '#';
        if (file) {
            try {
                downloadUrl = await handleFileUpload(file);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

        const newItem = { 
            id: storeItems.length + 1, 
            name, 
            description, 
            image: imageUrl, 
            category,
            downloadUrl
        };
        storeItems.push(newItem);
        renderStoreItems();
        renderExistingItems();

        addItemForm.reset();
        alert('Item added successfully!');
    });

    // Edit item form submission
    const editItemForm = document.getElementById('edit-item-form');
    editItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('edit-item-id').value);
        const name = document.getElementById('edit-item-name').value;
        const description = document.getElementById('edit-item-description').value;
        const imageUrl = document.getElementById('edit-item-image-url').value;
        const category = document.getElementById('edit-item-category').value;

        const itemIndex = storeItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            storeItems[itemIndex] = { ...storeItems[itemIndex], name, description, image: imageUrl, category };
            renderStoreItems();
            renderExistingItems();
            document.getElementById('edit-item-modal').style.display = 'none';
        }
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == adminLoginModal) {
            adminLoginModal.style.display = "none";
        }
        if (event.target == document.getElementById('edit-item-modal')) {
            document.getElementById('edit-item-modal').style.display = "none";
        }
    }

    // Settings functionality
    const settingsCards = document.querySelectorAll('.settings-card');
    const settingsContents = document.querySelectorAll('.settings-content');

    settingsCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetTab = card.getAttribute('data-settings-tab');
            settingsContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${targetTab}-settings`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Handle settings form submissions
    const settingsForms = document.querySelectorAll('.settings-content form');
    settingsForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const settings = Object.fromEntries(formData.entries());
            console.log('Settings saved:', settings);
            alert('Settings saved successfully!');
        });
    });
});