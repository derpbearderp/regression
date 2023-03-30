let nn = ml5.neuralNetwork({ task: 'regression', debug: true })
nn.load('./model/model.json', modelLoaded)

const predict = document.getElementById("result");
const labelOneBtn = document.querySelector("#btn");
labelOneBtn.addEventListener("click", () => makePrediction());

function modelLoaded(){
    console.log('model ready')
}

async function makePrediction() {
    let weight = document.getElementById('weight').value
    let resolution = document.getElementById('resolution').value
    let ppi = document.getElementById('ppi').value
    let cores = document.getElementById('resolution').value
    let cpu = document.getElementById('cpu').value
    let memory = document.getElementById('memory').value
    let storage = document.getElementById('storage').value
    let rearcam = document.getElementById('rearcam').value
    let frontcam = document.getElementById('frontcam').value
    let battery = document.getElementById('battery').value
    let thickness = document.getElementById('thickness').value

    
    const price = { weight:parseInt (weight), resolution:parseInt (resolution), ppi:parseInt (ppi), cores:parseInt (cores), cpu:parseInt (cpu), memory:parseInt (memory), storage:parseInt (storage), rearcam:parseInt (rearcam), frontcam:parseInt (frontcam), battery:parseInt (battery), thickness:parseInt (thickness) }
    const pred = await nn.predict(price)
    console.log(pred[0].price) 

    const phonevalue = pred[0].price
    const fmt = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })
    console.log(fmt.format(phonevalue))  

    predict.innerText =`That phone would be estimated to be worth ${fmt.format(phonevalue)}`
}