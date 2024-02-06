import { hikeData } from './hikedata.js';

const reversedWeeks = Object.keys(hikeData).reverse();
console.log(reversedWeeks);
// Function to calculate total miles, total hikes, total duration, and remaining miles
function calculateStats() {
    let totalMiles = 0;
    let totalHikes = 0;
    let totalDurationInMinutes = 0;
    let weeksInYear = 52;
    let goalMiles = 500;
    let hikeWeek =  hikeData.weeks.length;
    const weeksRemaining = weeksInYear - hikeWeek;


    // Reverse the order of hikes for each week
    const reversedWeeks = [...hikeData.weeks].reverse();

    reversedWeeks.forEach((week) => {

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
    //document.getElementById('hikeWeek').textContent = hikeWeek;
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

//Determining the current week of the year
const currentDate = new Date();
const startDate = new Date(currentDate.getFullYear(), 0, 1);
let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
let weekNumber = Math.ceil(days / 7);
//Place the years current week
document.getElementById("thisWeek").textContent = weekNumber;