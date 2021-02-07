function levelOfService(ride) {
  let levelOfService
  if (ride.length > 1) {
    levelOfService = 'Noober Pool'
  } else if (ride[0].purpleRequested) {
    levelOfService = 'Noober Purple'
  } else if (ride[0].numberOfPassengers > 3) {
    levelOfService = 'Noober XL'
  } else {
    levelOfService = 'Noober X'
  }
  return levelOfService
}

function renderRides(ridesArray) {
  for (let i = 0; i < ridesArray.length; i++) {
    let ride = ridesArray[i]

    document.querySelector('.rides').insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService(ride)}</span>
      </h1>
    `)

    let borderClass
    let backgroundClass
    if (levelOfService(ride) == 'Noober Purple') {
      borderClass = 'border-purple-500'
      backgroundClass = 'bg-purple-600'
    } else {
      borderClass = 'border-gray-900'
      backgroundClass = 'bg-gray-600'
    }

    for (let i = 0; i < ride.length; i++) {
      let leg = ride[i]

      document.querySelector('.rides').insertAdjacentHTML('beforeend', `
        <div class="border-4 ${borderClass} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${leg.passengerDetails.first} ${leg.passengerDetails.last}</h2>
              <p class="font-bold text-gray-600">${leg.passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl ${backgroundClass} text-white p-2">
                ${leg.numberOfPassengers} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${leg.pickupLocation.address}</p>
              <p>${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${leg.dropoffLocation.address}</p>
              <p>${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}</p>
            </div>
          </div>
        </div>
      `)
    }
  }
}

window.addEventListener('DOMContentLoaded', async function() {
  // YOUR CODE
  let jsonURL = 'https://kiei451.com/api/rides.json'

  // console.log(json)

  let filterButtons = document.querySelectorAll('.filter-button')
  let rideFilter = ''
  for (let i = 0; i < filterButtons.length; i++){
    // console.log(`Found button for ${filterButtons[i].innerHTML}`)
    filterButtons[i].addEventListener('click', function(event){
      let response = await fetch(jsonURL)
      let json = await response.json()
      
      rideFilter = event.target.innerHTML
      // console.log(`${rideFilter} button clicked.`)
      filteredRides = []
      if (rideFilter == 'All Rides'){
        // console.log(`Ride filter is ${rideFilter}`)
        filteredRides = json
      } else {
        // console.log(`Looking for ${rideFilter} rides...`)
        for (let j = 0; j < json.length; j++){
          // console.log(`Found a ${levelOfService(json[j])} ride...`)
          if (levelOfService(json[j]) == rideFilter){
            filteredRides.push(json[j])
            // console.log(`Adding ${levelOfService(json[i])} ride to filteredRides`)
          }
        }
        // console.log(`Found ${filteredRides.length} ${rideFilter} rides!`)
      }
      // console.log(filteredRides)
      document.querySelector('.rides').innerHTML = ''
      renderRides(filteredRides)
    })
  }

  // let filteredRides = []
  // allRidesElement.addEventListener('click', function(event){
  //   rideFilter = event.target.innerHTML
  //   console.log(`Selected filter is ${rideFilter}`)
  //   document.querySelector('.rides').innerHTML = ''
  //   renderRides(filteredRides)

  // let allRidesElement = document.querySelector('#all-filter')
  // let filteredRides = []
  // allRidesElement.addEventListener('click', function(event){
  //   rideFilter = event.target.innerHTML
  //   console.log(`Selected filter is ${rideFilter}`)
  //   document.querySelector('.rides').innerHTML = ''
  //   renderRides(filteredRides)
  // })
})

