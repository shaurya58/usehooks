import * as React from "react";

export default function useBattery() {
  const [batteryInfo, setBatteryInfo] = React.useState({
    supported: true,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });

  React.useEffect(() => {
    let battery = null;

    if (typeof window.navigator?.getBattery === "undefined") {
      setBatteryInfo((batteryInfo) => ({
        ...batteryInfo,
        supported: false,
        loading: false,
      }));
      return;
    }

    const onChange = () => {
      setBatteryInfo({
        supported: true,
        loading: false,
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      });
    };

    window.navigator?.getBattery().then((_battery) => {
      battery = _battery;

      onChange();

      _battery.addEventListener("levelchange", onChange);
      _battery.addEventListener("chargingchange", onChange);
      _battery.addEventListener("chargingtimechange", onChange);
      _battery.addEventListener("dischargingtimechange", onChange);
    });

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", onChange);
        battery.removeEventListener("chargingchange", onChange);
        battery.removeEventListener("chargingtimechange", onChange);
        battery.removeEventListener("dischargingtimechange", onChange);
      }
    };
  }, []);

  return batteryInfo;
}
