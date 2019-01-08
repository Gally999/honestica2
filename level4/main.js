// We retrieve the data
const data = "./data.json";

// We create a function to calculate the price per shift according to the status of the employee
function getPrice(status) {
  let price;
  if (status === "medic") {
    price = 270;
  } else if (status === "interne") {
    price = 126;
  } else {
    price = 480;
  }
  return price;
}

// We create a function to create a salary object to be pushed later
function createSalaryObject(id, status, shifts) {
  // We call the getPrice function to know the price of that employee
  const shiftPrice = getPrice(status);

  return {
    id, 
    price: shiftPrice * shifts,
  }
};


function calculateSalary(input) {
  // We create an empty array to push the data to later on
  const salaries = [];
  // We create an object with the business model info necessary: "pdg_fee" and "interim-shifts"
  let commission = {
    pdg_fee: 0,
    interim_shifts: 0,
  }

  // We loop over the list of employees
  input.workers.forEach(oneWorker => {
    // We create a buffer to know how many shifts each employee will have to work + another one to know how many shift are paid double
    let counter = 0;
    let dblShift = 0;
    
    // We loop over the shifts and identify the ones that belong to the employee we are looping over
    input.shifts.forEach(oneShift => {
     
      // if the shift ID corresponds to the employee id then we increment the counter
      if (oneShift.user_id === oneWorker.id) {
        counter++;
        // We convert the shift date into an object
        const day = new Date(oneShift.start_date);
        // if the day corresponds to a Saturday or Sunday, then we increment the double shift variable
        if (day.getDay() === 0 || day.getDay() === 6) {
          dblShift++;
        }
      }
    });
    // At the end of the loop, we push the result to the salaries array: the ID and the total of shifts times the price per shift
    salaries.push(createSalaryObject(oneWorker.id, oneWorker.status, counter + dblShift));

    // Whatever happens there is a 5% fee on the total price
    commission.pdg_fee += getPrice(oneWorker.status) * (counter + dblShift) * 0.05;

    // Then we check if there are speciale fees that incur for each employee / shift
    if (oneWorker.status === "interim") {
      // We add the # of shift of the interim to the commission counter
      commission.interim_shifts += counter;
      // for interims the commission fees are 80 euros times the number of shifts
      commission.pdg_fee += (80 * counter) 
    } 
  });


  // We create an empty object to which we create a key and assign it the salaries array + the commission object
    let output = {}
    output.workers = salaries;
    output.commission = commission ;

    // We transform the output object into a JSON 
    return JSON.stringify(output); 
};

console.log(calculateSalary(data));