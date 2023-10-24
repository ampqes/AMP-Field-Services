let jobs = [];
let companies = [];
let contacts = [];
let assets = [];
let inProgressJobs = [];
let finishedJobs = [];

// Function to initialize the page
function initializePage() {
    displayJobInfo();
    displayCompanyInfo();
    displayContactInfo();
    displayNewAssets();
}

// Function to display job information
function displayJobInfo() {
    const inProgressJobsDiv = document.getElementById('in-progress-jobs');
    inProgressJobsDiv.innerHTML = '';
    
    inProgressJobs.forEach((job, index) => {
        const jobDetails = createJobDetails(job, index);
        inProgressJobsDiv.innerHTML += jobDetails;
    });

    const finishedJobsDiv = document.getElementById('finished-jobs');
    finishedJobsDiv.innerHTML = '';
    
    finishedJobs.forEach((job, index) => {
        const jobDetails = createJobDetails(job, index, true);
        finishedJobsDiv.innerHTML += jobDetails;
    });
}

// Function to create job details
function createJobDetails(job, index, isFinished = false) {
    const jobStatus = isFinished ? 'Finished' : 'In Progress';
    const jobElement = `
        <div class="job-details" id="job-${index}" draggable="true" ondragstart="drag(event, ${index})" ondrop="drop(event, '${isFinished ? 'finished' : 'in-progress'}')">            
            <h3>Job ${index + 1}</h3>
            <p><strong>Project Number:</strong> ${job.projectNumber}</p>
            <p><strong>Date Started:</strong> ${job.dateStarted}</p>
            <p><strong>Customer:</strong> ${job.customer}</p>
            <p><strong>Contact:</strong> ${job.contact}</p>
            <p><strong>Status:</strong> ${jobStatus}</p>
            ${isFinished ? '' : `<p><strong>Time Elapsed:</strong> <span class="timer">0:0:0</span></p>`}
            ${isFinished ? '' : `<button onclick="finishJob(${index})">Finish Job</button>`}
        </div>
    `;

    return jobElement;
}

// Function to add a new asset
function addAsset(event) {
    event.preventDefault();
    const asset = {
        assetName: document.getElementById('asset_name').value,
        assetType: document.getElementById('asset_type').value,
        assetDetails: document.getElementById('asset_details').value,
    };
    assets.push(asset);

    document.getElementById('asset_name').value = '';
    document.getElementById('asset_type').value = '';
    document.getElementById('asset_details').value = '';

    displayNewAssets();
    closeForm('form4');
}

// Function to display newly added assets
function displayNewAssets() {
    const assetInfoDiv = document.getElementById('asset-info');
    assetInfoDiv.innerHTML = '';

    assets.forEach((asset, index) => {
        const assetDetails = `
            <div class="job-details">
                <h3>New Asset ${index + 1}</h3>
                <p><strong>Asset Name:</strong> ${asset.assetName}</p>
                <p><strong>Asset Type:</strong> ${asset.assetType}</p>
                <p><strong>Asset Details:</strong> ${asset.assetDetails}</p>
            </div>
        `;
        assetInfoDiv.innerHTML += assetDetails;
    });
}



// Function to handle dropping
function drop(event, targetStatus) {
    event.preventDefault();
    const jobIndex = event.dataTransfer.getData('jobIndex');
    const job = inProgressJobs[jobIndex];

    if (targetStatus === 'finished') {
        finishJob(jobIndex);
    }

    displayJobInfo();
}

// Function to finish a job
function finishJob(index) {
    const job = inProgressJobs[index];
    job.status = 'finished';

    finishedJobs.push(job);
    inProgressJobs.splice(index, 1);

    displayJobInfo();
}

// Function to open a tab
function openTab(event, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');

    tabContents.forEach(content => content.style.display = 'none');
    tabButtons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.classList.add('active');
}

// Function to open a form
function openForm(formId) {
    const form = document.getElementById(formId);
    const forms = document.querySelectorAll('.form');

    forms.forEach(form => {
        if (form.style.display === 'block') {
            form.style.display = 'none';
        }
    });

    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Function to close a form
function closeForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = 'none';
    form.reset(); // Reset the form fields after clicking submit
}

// Function to add a new job
function addJob(event) {
    event.preventDefault();
    const job = {
        projectNumber: document.getElementById('project_number').value,
        dateStarted: document.getElementById('date_started').value,
        customer: document.getElementById('customer').value,
        contact: document.getElementById('contact').value,
        assets: document.getElementById('assets').value,
        status: 'in-progress',
    };

    inProgressJobs.push(job);

    document.getElementById('project_number').value = '';
    document.getElementById('date_started').value = '';
    document.getElementById('customer').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('assets').value = '';

    displayJobInfo();
    closeForm('form1');
}

// Function to start the job timer
function startJobTimer(job) {
    const startTime = Date.now();
    return setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const formattedTime = `${hours}:${minutes % 60}:${seconds % 60}`;

        // Display the elapsed time for the in-progress job
        const jobElement = document.getElementById(`job-${inProgressJobs.indexOf(job)}`);
        jobElement.querySelector('.timer').textContent = formattedTime;
    }, 1000);
}

// Function to add a new company
function addCompany(event) {
    event.preventDefault();
    const company = {
        companyName: document.getElementById('company_name').value,
        address: document.getElementById('company_address').value,
        contact: document.getElementById('company_contact').value,
    };
    companies.push(company);

    document.getElementById('company_name').value = '';
    document.getElementById('company_address').value = '';
    document.getElementById('company_contact').value = '';

    displayCompanyInfo();
    closeForm('form2');
}

// Function to add a new contact// Function to add a new contact
function addContact(event) {
    event.preventDefault();
    const contact = {
        name: document.getElementById('contact_name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
    };
    contacts.push(contact);

    document.getElementById('contact_name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';

    displayContactInfo();
    closeForm('form3');
}

// Function to display company information
function displayCompanyInfo() {
    const companyInfoDiv = document.getElementById('company-info');
    companyInfoDiv.innerHTML = '';

    companies.forEach((company, index) => {
        const companyDetails = `
            <div class="company-details">
                <h3>Company ${index + 1}</h3>
                <p><strong>Company Name:</strong> ${company.companyName}</p>
                <p><strong>Company Address:</strong> ${company.address}</p>
                <p><strong>Contact:</strong> ${company.contact}</p>
            </div>
        `;
        companyInfoDiv.innerHTML += companyDetails;
    });
}

// Function to display contact information
function displayContactInfo() {
    const contactInfoDiv = document.getElementById('contact-info');
    contactInfoDiv.innerHTML = '';

    contacts.forEach((contact, index) => {
        const contactDetails = `
            <div class="contact-details">
                <h3>Contact ${index + 1}</h3>
                <p><strong>Name:</strong> ${contact.name}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Phone:</strong> ${contact.phone}</p>
            </div>
        `;
        contactInfoDiv.innerHTML += contactDetails;
    });
}

// Function to display customer information
function displayCustomerInfo() {
    // Replace this with your implementation to fetch customer info from the server.
}


// Function to fetch contact information from the server
function fetchContactInfo() {
    fetch('/contacts')
        .then(response => response.json())
        .then(data => {
            contacts = data;
            displayContactInfo();
        })
        .catch(error => console.error(error));
}