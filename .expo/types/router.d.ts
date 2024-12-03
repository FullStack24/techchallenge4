/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/admin/AdminScreen` | `/(tabs)/auth/LoginScreen` | `/(tabs)/auth/RegisterScreen` | `/(tabs)/explore` | `/(tabs)/home/HomeScreen` | `/(tabs)/posts/CreatePostScreen` | `/(tabs)/posts/EditPostScreen` | `/(tabs)/posts/PostDetailScreen` | `/(tabs)/students/CreateStudentScreen` | `/(tabs)/students/EditStudentScreen` | `/(tabs)/students/ListStudentsScreen` | `/(tabs)/teachers/CreateTeacherScreen` | `/(tabs)/teachers/EditTeacherScreen` | `/(tabs)/teachers/ListTeachersScreen` | `/_sitemap` | `/admin/AdminScreen` | `/auth/LoginScreen` | `/auth/RegisterScreen` | `/explore` | `/home/HomeScreen` | `/posts/CreatePostScreen` | `/posts/EditPostScreen` | `/posts/PostDetailScreen` | `/services/authService` | `/services/commentService` | `/services/postService` | `/services/userService` | `/students/CreateStudentScreen` | `/students/EditStudentScreen` | `/students/ListStudentsScreen` | `/teachers/CreateTeacherScreen` | `/teachers/EditTeacherScreen` | `/teachers/ListTeachersScreen` | `/types/react-native-vector-icons.d`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
