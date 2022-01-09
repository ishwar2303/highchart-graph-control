
// Radialize the colors
Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    })
});
const loadChart = (graphTitle, format, seriesData) => {
    // Build the chart
    Highcharts.chart('graph-container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: graphTitle
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: ''
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: format,
                    connectorColor: 'silver'
                }
            }
        },
        series: seriesData
    });
    
}

const addDataContainer = document.getElementById('add-data-container');

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

const addData = () => {
    let block = inputBlock();
    let input = inputContainer('text', 'Name');
    let box = document.createElement('div');
    box.className = 'input-box-container';
    let data = dataBlock();
    data.style.margin = '10px 0px';
    data.style.marginLeft = '10px';
    box.appendChild(data);
    block.appendChild(input);
    block.appendChild(box);
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-small';
    btn.innerText = 'Remove';
    btn.style.marginLeft = '10px';
    btn.addEventListener('click', () => {
        block.remove();
    })
    block.appendChild(btn);
    addDataContainer.appendChild(block);
}


const fetchData = () => {
    let seriesName = document.getElementById('series-name').value;
    let block = addDataContainer.getElementsByClassName('input-block');
    let data = [];
    for(let i=0; i<block.length; i++) {
        let obj = {
            name: '',
            y: 0
        };
        let inputs = block[i].getElementsByTagName('input');
        obj.name = inputs[0].value;
        obj.y = parseFloat(inputs[1].value);
        data.push(obj);
    }
    let seriesData = {
        name: seriesName,
        data: data
    }
    return [seriesData];
}

document.getElementById('add-data-btn').addEventListener('click', addData);

document.getElementById('load-chart-btn').addEventListener('click', () => {
    let graphTitle = document.getElementById('graph-title').value;
    let valueSuffix = document.getElementById('value-suffix').value;
    let seriesData = fetchData();

    let radio = document.getElementsByName('viewType')
    let format = '';
    if(radio[0].checked) {
        format = '<b>{point.name}</b>: {point.percentage:.1f}' + ' %'
    }
    else {
        format = '<b>{point.name}</b>: {point.y}' + valueSuffix
    }
    loadChart(graphTitle, format, seriesData);
});