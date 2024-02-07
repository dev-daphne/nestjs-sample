export interface CreateEventParams {
  /** 이벤트 이름 */
  name: string;

  /** 이벤트 날짜 */
  date: Date;

  /** 이벤트 장소 */
  location: string;

  /** 티켓 발행 수 */
  maxTickets: number;
}
