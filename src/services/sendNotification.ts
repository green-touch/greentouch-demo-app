import notifee, { AndroidImportance,AndroidStyle } from "@notifee/react-native";
import { AppState } from "react-native";

export const sendNotification = async (title: string, body: string) => {
  try {

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: "network-alerts",
       asForegroundService: true, // 포그라운드 서비스 활성화
        smallIcon: "@drawable/logo_symbol", // 아이콘 설정
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default', // 기본 클릭 동작
        },
        style: {
          type: AndroidStyle.BIGTEXT, // 긴 텍스트 스타일
          text: body,
        },
      },
    });
    console.log("네이티브 알림 전송 성공");
 
  } catch (error) {
    console.error("네이티브 알림 전송 실패:", error);
  }
};
