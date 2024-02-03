import { hikeData } from './hikedata.js';


// Function to calculate total miles, total hikes, total duration, and remaining miles
function calculateStats() {
    let totalMiles = 0;
    let totalHikes = 0;
    let totalDurationInMinutes = 0;
    let weeksInYear = 52;
    let goalMiles = 500;
    let currentWeek =  hikeData.weeks.length;
    const weeksRemaining = weeksInYear - currentWeek;

    // Loop through weeks
    hikeData.weeks.forEach((week) => {
        // Loop through hikes in each week
        week.hikes.forEach((hike) => {
            totalMiles += hike.mileage;
            totalHikes++;
            totalDurationInMinutes += (hike.duration.hours || 0) * 60 + (hike.duration.minutes || 0);
        });

        // Generate HTML for the week
        const weekHTML = `
            <div class="weekly-row" >
                <div class="overview">
                    <div class="wk-number"><span class="label">Week</span><span class="number">${week.week_number}</span></div>
                    <div class="wk-miles"><span class="number">${week.hikes.reduce((acc, hike) => acc + hike.mileage, 0).toFixed(2)}</span><span class="label"> Miles</span></div>
                    <div class="wk-trails"><span class="number">${week.hikes.length}</span><span class="label"> Trails</span></div>
                    <div class="wk-toggle"><span class="icon"></span></div>
                </div>
                <div class="detail grid-hack">
                    <div class="inner">
                        <div class="trail-list">
                            ${week.hikes.map((hike) => `
                            <div class="trail">
                                <div class="trail-image"><img src="${hike.image}" alt="Map of ${hike.name}" /></div>
                                <div class="trail-details">
                                    <div class="trail-name"><h3>${hike.name}</h3></div>
                                    <div class="trail-location">${hike.location}</div>
                                    <div class="trail-length">${hike.mileage.toFixed(2)} mi</div>
                                    <div class="trail-time">${hike.duration.hours || 0}hr ${hike.duration.minutes || 0}min</div>
                                    <div class="trail-date">${hike.date}</div>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append the generated HTML to the document
        document.getElementById('weekly-table').insertAdjacentHTML('beforeend', weekHTML);
    });


    // Convert total duration to hours with decimal places
    const totalDurationInHours = totalDurationInMinutes / 60;

    // Calculate remaining miles
    const remainingMiles = goalMiles - totalMiles;

    // Calculate percent complete
    const percentComplete = (totalMiles / goalMiles) * 100;

    // Calculate remaining miles per remaining weeks
    const milesPerWeek = remainingMiles/weeksRemaining;

    // Display the results in the HTML document
    document.getElementById('currentWeek').textContent = currentWeek;
    document.getElementById('number-miles-completed').textContent = totalMiles.toFixed(1);
    document.getElementById('number-trails').textContent = totalHikes;
    document.getElementById('number-hours').textContent = totalDurationInHours.toFixed(1);
    document.getElementById('number-miles-remaining').textContent = remainingMiles.toFixed(0);
    document.getElementById('number-percent-finished').textContent = percentComplete.toFixed(0);
    document.getElementById('number-mile-split').textContent = milesPerWeek.toFixed(2);
    document.getElementById('remaining-weeks').textContent = weeksRemaining.toFixed(0);
}

// Call the function to calculate and display statistics
calculateStats();

//Collapse of weekly rows
const divs = document.querySelectorAll('.weekly-row');
function arse() {
    divs.forEach((element) => element.classList.remove('active'));
}
divs.forEach(el => el.addEventListener('click', event => {
    if(event.target.closest(".weekly-row").classList.contains("active")){
        event.target.closest(".weekly-row").classList.remove('active');
    }else{
        arse();
        event.target.closest(".weekly-row").classList.add('active');
    }
}));