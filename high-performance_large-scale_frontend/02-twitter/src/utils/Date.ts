// export default class CurrentDateUtils {
//   getCurrentDate(): string {
//     return new Date().toLocaleDateString('ko', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//     });
//   }
// }

export function getCurrentDate(): string {
  return new Date().toLocaleDateString('ko', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
