// We retrieve the data
const data = "./data.json";


// We create a function to create a salary object to be pushed later
function createSalaryObject(id, price) {
  return {
    id, 
    price,
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
      if (oneShift.user_id === oneWorker.id) {
        // if the employee is the same, then we increment the counter 
        counter++;
      }
    });
    // At the end of the loop, we push the result to the salaries array: the ID and the total of shifts times the price per shift
    salaries.push(createSalaryObject(oneWorker.id, oneWorker.price_per_shift * counter));

  });
  // We create an empty object to which we create a key and assign it the salaries array
    let output = {}
    output.workers = salaries;

    // We transform the output object into a JSON 
    return JSON.stringify(output); 
};

console.log(calculateSalary(data));