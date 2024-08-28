import Blueprint from './index';

class WaitCondition {
  compare_type: string;
  type: string;

  constructor(data: any) {
    this.compare_type = data.compare_type;
    this.type = data.type;
  }

  getData() {
    return {
      'compare_type': this.compare_type,
      'type': this.type,
    };
  }
}

class Schedule {
  station: string;
  wait_conditions: WaitCondition[];

  constructor(data: any) {
    this.station = data.station;
    this.wait_conditions = (data.wait_conditions || []).map(x => new WaitCondition(x));
  }

  getData() {
    return {
      'station': this.station, // todo fix IDs
      'wait_conditions': this.wait_conditions.length ? this.wait_conditions.map(x => x.getData()) : undefined,
    };
  }
}

export default class ScheduleWrapper {
  locomotives: number[];
  schedule: Schedule[];
  bp: Blueprint;

  constructor(data: any, bp: Blueprint) {
    this.bp = bp;
    this.locomotives = data.locomotives;
    this.schedule = (data.schedule || []).map(x => new Schedule(x));
  }

  getData() {
    return {
      'locomotives': this.locomotives, // todo fix IDs
      'schedule': this.schedule.map(x => x.getData()),
    };
  }
}
