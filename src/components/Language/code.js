const equipmentCode = {
  unknown: 0,
  smoke: 1,
  alarmBell: 3,
  MFA: 4,
  FSALAlarm: 5,
  CGD: 6,
  DSSWD: 7,
  tempDetector: 8,
  Transmitter: 9,
  distanceDetector: 10,
  voicePrompt: 11,
  CMD: 12,
  SCD: 13,
  FAC: 14,
  TSD: 15,
  LevelGauge: 16,
  pressureGauge: 17,
  SOS: 18,
  GPS: 19,
  SOSGPS: 20,
  ElectricalDetector: 30,
  GatewayEquipment: 31
}

const deviceStatus = {
  unknown: 0,
  Normal: 1,
  Alarming: 3,
  batteryLow: 8,
  doorClosed: 29
}
export { equipmentCode, deviceStatus };