// Sample student data
const students = [
    { id: 1, name: "Emily Chen", initials: "EC" },
    { id: 2, name: "James Wilson", initials: "JW" },
    { id: 3, name: "Sophia Martinez", initials: "SM" },
    { id: 4, name: "Liam Johnson", initials: "LJ" },
    { id: 5, name: "Olivia Davis", initials: "OD" },
    { id: 6, name: "Noah Brown", initials: "NB" },
    { id: 7, name: "Ava Miller", initials: "AM" },
    { id: 8, name: "William Taylor", initials: "WT" },
    { id: 9, name: "Isabella Anderson", initials: "IA" },
    { id: 10, name: "Mason Thomas", initials: "MT" },
    { id: 11, name: "Mia Jackson", initials: "MJ" },
    { id: 12, name: "Benjamin White", initials: "BW" },
    { id: 13, name: "Charlotte Harris", initials: "CH" },
    { id: 14, name: "Elijah Martin", initials: "EM" },
    { id: 15, name: "Amelia Thompson", initials: "AT" },
    { id: 16, name: "Lucas Garcia", initials: "LG" },
    { id: 17, name: "Harper Martinez", initials: "HM" },
    { id: 18, name: "Alexander Robinson", initials: "AR" },
    { id: 19, name: "Evelyn Clark", initials: "EC" },
    { id: 20, name: "Henry Rodriguez", initials: "HR" },
    { id: 21, name: "Sofia Hernandez", initials: "SH" },
    { id: 22, name: "Daniel Lee", initials: "DL" },
    { id: 23, name: "Scarlett Walker", initials: "SW" },
    { id: 24, name: "Michael King", initials: "MK" }
];

// Set current date
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);

// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the target section
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});

// Generate student list
const studentGrid = document.querySelector('.student-grid');
students.forEach(student => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.setAttribute('data-id', student.id);
    card.innerHTML = `
        <div class="student-avatar">${student.initials}</div>
        <div class="student-name">${student.name}</div>
        <div class="student-id">ID: ${String(student.id).padStart(4, '0')}</div>
    `;
    
    // Add click event to show student progress
    card.addEventListener('click', () => {
        document.getElementById('student-name').textContent = student.name;
        document.querySelector('.student-grid').style.display = 'none';
        document.getElementById('student-progress').style.display = 'block';
        
        // Animate progress bars
        setTimeout(() => {
            document.querySelectorAll('.progress-fill').forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        }, 300);
    });
    
    studentGrid.appendChild(card);
});

// Back to students button
document.getElementById('back-to-students').addEventListener('click', () => {
    document.getElementById('student-progress').style.display = 'none';
    document.querySelector('.student-grid').style.display = 'grid';
});

// Generate report chart
document.getElementById('generate-report').addEventListener('click', function() {
    const ctx = document.getElementById('class-report-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.classReportChart) {
        window.classReportChart.destroy();
    }
    
    // Create new chart
    window.classReportChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Science', 'Technology', 'Engineering', 'Math'],
            datasets: [{
                label: 'Average Score (%)',
                data: [85, 92, 76, 89],
                backgroundColor: [
                    'rgba(78, 84, 200, 0.7)',
                    'rgba(42, 210, 201, 0.7)',
                    'rgba(255, 126, 95, 0.7)',
                    'rgba(155, 89, 182, 0.7)'
                ],
                borderColor: [
                    'rgba(78, 84, 200, 1)',
                    'rgba(42, 210, 201, 1)',
                    'rgba(255, 126, 95, 1)',
                    'rgba(155, 89, 182, 1)'
                ],
                borderWidth: 1,
                borderRadius: 6,
                hoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.9)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 12,
                    cornerRadius: 6
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
});

// Auto-generate report on page load for demo purposes
window.onload = function() {
    document.getElementById('generate-report').click();
};