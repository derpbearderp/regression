import { createChart, updateChart } from "./scatterplot.js";

let nn = ml5.neuralNetwork({ task: "regression", debug: true });
let trainData
let testData

loadData();

function loadData() {
  Papa.parse("./data/mobilephones.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (results) => checkData(results.data),
  });
}

function checkData(data) {
  console.table(data);
  data.sort(() => Math.random() - 0.5);
  trainData = data.slice(0, Math.floor(data.length * 0.8));
  testData = data.slice(Math.floor(data.length * 0.8) + 1);

  for (let phone of trainData) {
    //    console.log(phone)

    nn.addData(
      { weight: phone.weight, resolution: phone.resolution, ppi:phone.ppi, cpu:phone.cpu, memory:phone.memory, storage:phone.storage, rearcam:phone.rearcam, frontcam:phone.frontcam, battery:phone.battery, thickness:phone.thickness },
      { price: phone.price }
    );
  }
  nn.normalizeData()
  nn.train({ epochs: 10 }, () => finishedTraining());
}

function finishedTraining(){
    console.log("finished training")
    makePrediction()
}

async function makePrediction() {
        const testPhone = { weight: testData[0].weight, resolution: testData[0].resolution, ppi:testData[0].ppi, cpu:testData[0].cpu, memory:testData[0].memory, storage:testData[0].storage, rearcam:testData[0].rearcam, frontcam:testData[0].frontcam, battery:testData[0].battery, thickness:testData[0].thickness }
        const pred = await nn.predict(testPhone)
        console.log(pred[0].price) 
    }


// weight: phone.weight, resolution: phone.resolution, ppi:phone.ppi, cpu:phone.cpu, memory:phone.memory, storage:phone.storage, rearcam:phone.rearcam, frontcam:phone.frontcam, battery:phone.battery, thickness:phone.thickness
//   const chartdata = data.map(car => ({
//             x: car.horsepower,
//            y: car.mpg,
//           }))

//             // kijk hoe de data eruit ziet
//             console.log(chartdata)

//             // chartjs aanmaken
//             createChart(chartdata, "Horsepower", "MPG")

//             // shuffle
//             data.sort(() => (Math.random() - 0.5))

//             // een voor een de data toevoegen aan het neural network
//             for (let car of data) {
//                 nn.addData({ horsepower: car.horsepower }, { mpg: car.mpg })
//             }
//             // normalize
//             nn.normalizeData()

//     nn.train({ epochs: 10 }, () => finishedTraining())
//     }

//         //     async function makePrediction() {
//         //         const results = await nn.predict({ horsepower: 90 })
//         //         console.log(`Geschat verbruik: ${results[0].mpg}`)
//         //     }

//   async function finishedTraining() {
//          let predictions = []
//         for (let hp = 40; hp < 250; hp += 2) {
//             const pred = await nn.predict({horsepower: hp})
//            predictions.push({x: hp, y: pred[0].mpg})
//          }
//         updateChart("Predictions", predictions)
//           }
