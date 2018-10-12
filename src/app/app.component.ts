import { Component } from '@angular/core';
import * as allChartData from './utils/chart.data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public view: any[] = [undefined, 400];

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Country';
  public showYAxisLabel = true;
  public yAxisLabel = 'Total Call counts';
  public barPadding = 15;
  public yScaleMax = 10000;
  public roundDomains = true;
  public showGridLines = true;
  public innerIndex = -1;
  public outerIndex = -1;
  public colorScheme = {
    domain: ['rgb(67, 67, 72)', 'rgb(128, 133, 233)', 'rgb(241, 92, 128)', 'rgb(228, 211, 84)', 'rgb(43, 144, 143)']
  };
  public prevIndexes = [];
  public currentChartData = [];
  constructor() {
    // Object.assign(this, { single });
    this.currentChartData = allChartData[0].data;
    const initialIndex = allChartData.findIndex(value => value.name === 'initial');
    this.currentChartData = allChartData[initialIndex].data;
  }

  public onSelect(event) {
    try {
      this.outerIndex = allChartData.findIndex(value => {
        this.innerIndex = value.data.findIndex(inner => inner['name'] === event.name);
        return this.innerIndex > -1;
      });
      if (this.innerIndex < 0 && this.outerIndex < 0) {
        return;
      }
      const index1 = allChartData.findIndex(value => value.id === allChartData[this.outerIndex].data[this.innerIndex]['subChartId']);
      if (index1 < 0) {
        return;
      }
      this.currentChartData = allChartData[index1].data;
      this.prevIndexes.push(this.outerIndex);
    } catch (e) {
      this.currentChartData = allChartData[0].data;
    }
  }

  public goBack() {
    if (this.prevIndexes.length <= 0) {
      return;
    }
    const lastIndex = this.prevIndexes.length - 1;
    const prevGraphId = this.prevIndexes[lastIndex];
    this.currentChartData = allChartData[prevGraphId].data;
    this.prevIndexes.splice(lastIndex, 1);
  }

  public onResize(event) {
    if (event.target.innerWidth < 1060) {
      this.view = [event.target.innerWidth - 100, 400];
    } else {
      this.view = [event.target.innerWidth / 2 - 100, 400];
    }
  }

}
