// We retrieve the data
const data = "./data.json";


// We create a function to create a salary object to be pushed later
function createSalaryObject(id, status, shifts) {
  let price;
  // we determine the price according to the status of the employee
  if (status === "medic") {
    price = 270;
  } else {
    price = 126;
  }
  
  return {
    id, 
    price: price * shifts,
  }
};


function calculateSalary(input) {
  // We create an empty array to push the data to later on
  const salaries = [];

  // We loop over the list of employees
  input.workers.forEach(oneWorker => {
    // We create a buffer to know how many shifts each employee will have to work 
    let counter = 0;
    
    // We loop over the shifts and identify the ones that belong to the employee we are looping over
    input.shifts.forEach(oneShift => {
     
      // if the employee is the same, then we increment the counter 
      if (oneShift.user_id === oneWorker.id) {
        // We convert the start_date to a date object and use the getDay() method, if the day corresponds to Saturday or Sunday then we increment by 2
        const day = new Date(oneShift.start_date);
        if (day.getDay() === 0 || day.getDay() === 6) {
          counter +=2;
        } else {
          // otherwise, we just increment by 1
          counter++;
        }
      }
    });
    // At the end of the loop, we push the result to the salaries array: the ID and the total of shifts times the price per shift
    salaries.push(createSalaryObject(oneWorker.id, oneWorker.status, counter));

  });
  // We create an empty object to which we create a key and assign it the salaries array
    let output = {}
    output.workers = salaries;

    // We transform the output object into a JSON 
    return JSON.stringify(output); 
};

console.log(calculateSalary(data));