export interface Logger {
  group(message: string, ...args: any[]): void
  log(message?: string, ...args: any[]): void
  warn(message?: string, ...args: any[]): void
  error(message?: string, ...args: any[]): void
  groupEnd(message?: string, ...args: any[]): void
}
