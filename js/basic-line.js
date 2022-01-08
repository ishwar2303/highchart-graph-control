const loadChart = (graphTitle, xTitle, yTitle, pStart, seriesData) => {

    Highcharts.chart('graph-container', {

        title: {
            text: graphTitle
        },
    
        subtitle: {
            text: null
        },
    
        yAxis: {
            title: {
                text: yTitle
            }
        },
    
        xAxis: {
            title: {
                text: xTitle
            },
            accessibility: {
                rangeDescription: 'Range: 2010 to 2017'
            },
            labels: {
                align: 'left',
                rotation: 45
            }
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: pStart
            }
        },
    
        series: seriesData,
    
        credits: {
            enabled: false
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

const seriesContainer = document.getElementById('add-series-container');

const inputBlock = () => {
    let div = document.createElement('div');
    div.className = 'input-block';
    return div;
}

const inputContainer = (inputType, inputLabel) => {
    let div = document.createElement('div');
    div.className = 'input-container-floating';
    let input = document.createElement('input');
    input.type = inputType;
    input.required = 'true';
    let label = document.createElement('label');
    label.innerText = inputLabel;
    div.appendChild(input);
    div.appendChild(label);
    return div;
}

const dataBlock = () => {
    let input = document.createElement('input');
    input.className = 'input-data-box';
    input.type = 'number';
    input.placeholder = 'Data';
    return input;
}

const addSeries = () => {

    let blockCount = seriesContainer.getElementsByClassName('series-block').length + 1;

    let dataLength = document.getElementById('data-length').value;
    if(!dataLength) {
        alert('Enter Data Length');
        return;
    }
    let seriesBlock = document.createElement('div');
    seriesBlock.className = 'series-block';

    let h4 = document.createElement('h4');
    h4.className = 'series-heading';
    h4.innerText = 'Series ' + blockCount;
    seriesBlock.appendChild(h4);

    let block = inputBlock();
    let input = inputContainer('text', 'Name');
    block.appendChild(input);
    seriesBlock.appendChild(block);

    let inputBoxContainer = document.createElement('div');
    inputBoxContainer.className = 'input-box-container';
    for(let i=0; i<dataLength; i++) {
        let inputBlock = dataBlock();
        inputBoxContainer.appendChild(inputBlock);
    }

    let btnContainer = document.createElement('div');
    btnContainer.className = 'flex-row jc-e';

    let button = document.createElement('button');
    button.className = 'btn btn-danger btn-small';
    button.innerText = 'Remove';
    button.addEventListener('click', () => {
        seriesBlock.remove();
    })
    btnContainer.appendChild(button);


    seriesBlock.appendChild(inputBoxContainer);

    seriesBlock.appendChild(btnContainer);
    
    seriesContainer.appendChild(seriesBlock);
}


const fetchData = () => {
    let seriesData = Array();
    let seriesBlock = document.getElementsByClassName('series-block');
    for(let i=0; i<seriesBlock.length; i++) {
        let obj = {
            name: '',
            data: Array()
        };
        let seriesName = seriesBlock[i].getElementsByClassName('input-container-floating')[0].getElementsByTagName('input')[0].value;
        obj.name = seriesName;
        let inputs = seriesBlock[i].getElementsByClassName('input-box-container')[0].getElementsByTagName('input');
        let data = Array();
        for(let j=0; j<inputs.length; j++) {
            data.push(parseInt(inputs[j].value));
        }
        obj.data = data;
        seriesData.push(obj);
    }
    return seriesData;
}

document.getElementById('load-chart-btn').addEventListener('click', () => {
    let graphTitle = document.getElementById('graph-title').value;
    let xTitle = document.getElementById('xAxis-title').value;
    let yTitle = document.getElementById('yAxis-title').value;
    let pointStart = document.getElementById('point-start').value;
    pointStart = parseInt(pointStart);
    let seriesData = fetchData();
    console.log(seriesData);
    loadChart(graphTitle, xTitle, yTitle, pointStart, seriesData);
})