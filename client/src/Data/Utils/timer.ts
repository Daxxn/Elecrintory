type TimerCallback = () => void;

class Timer {
   // #region Props
   private static interval: number = 5000;
   private static readonly maxInterval: number = 10000;
   private static timerId: NodeJS.Timeout | null = null;
   // #endregion

   // #region Methods
   static start(callback: TimerCallback) {
      if (this.timerId != null) {
         clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(() => this.finished(callback), this.interval);
   }

   private static finished(callback: TimerCallback) {
      this.timerId = null;
      callback();
   }

   static setInterval(interval: number) {
      if (interval > 0 && interval <= this.maxInterval) {
         this.interval = interval;
      }
   }
   // #endregion
}

export default Timer;
