import React from 'react';
import {Line} from 'react-chartjs-2';

import appApi from 'services/app-api';
import HeadingPane from 'components/heading-pane';

const options = {
  responsive: true,
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        },
        ticks: {
          beginAtZero: true,
          stepSize: 5
        }
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        },
        ticks: {
          beginAtZero: true,
          stepSize: 5
        }
      }
    ]
  }
};

const plugins = [{
  afterDraw: (chartInstance, easing) => {
      const ctx = chartInstance.chart.ctx;
      ctx.fillText("This text drawn by a plugin", 100, 100);
    }
}];

export default class OrderStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: new Array(5).fill(''),
      receivered: new Array(5).fill(0),
      delivered: new Array(5).fill(0)
    }
  }

  componentDidMount() {
    appApi.ready().get('/orders/five-days-stat').then(res => {
      this.setState({labels: res.data.days,
                     receivered: res.data.receivered,
                     delivered: res.data.delivered});
    })
  }

  render() {
    const data = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'Receivered',
          type:'line',
          data: this.state.receivered,
          fill: false,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-2'
        },
        {
          type: 'line',
          label: 'Delivered',
          data: this.state.delivered,
          fill: false,
          borderColor: '#71B37C',
          backgroundColor: '#71B37C',
          yAxisID: 'y-axis-1'
        }
      ]
    };
    return (
      <HeadingPane panelHeader="Order Stat">
        <Line
          data={data}
          options={options}
        />
      </HeadingPane>
    )
  }
}
