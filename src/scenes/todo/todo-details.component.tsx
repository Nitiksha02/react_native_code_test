import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, AsyncStorage } from "react-native";
import { Button, Layout, LayoutElement, Text } from "@ui-kitten/components";
import { EdgeInsets, useSafeArea } from "react-native-safe-area-context";
import { TodoDetailsScreenProps } from "../../navigation/todo.navigator";
import { Toolbar } from "../../components/toolbar.component";
import { ImageOverlay } from "../../components/image-overlay.component";
import { ProgressBar } from "../../components/progress-bar.component";
import { Todo } from "../../data/todo.model";
import CachedImage from "../../components/cachedImage";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { SharedElement } from 'react-navigation-shared-element';

export type TodoDetailsRouteParams = {
  todo: Todo;
};

const TodoDetailsScreen = (
  props: TodoDetailsScreenProps
): LayoutElement => {
  const { todo } = props.route.params;
  const [Content, setContent] = useState('');
  const [Percent, setPercent] = useState(todo.progress);
  const insets: EdgeInsets = useSafeArea();



  useEffect(() => {
    ParcentData()
  }, []);

  const ParcentData = () => {
    if (todo.content) {
      let data = todo.content
      if (Percent < 100) {
        let percent = ((Percent + 10) * data.length) / 100
        data = data.substring(0, percent)
        setContent(data)
        if ((Percent + 10) < 70) {
          AsyncStorage.setItem('Todo', JSON.stringify({ index: todo.index, progress: Percent + 10 }))
        }
        else {
          AsyncStorage.clear()
        }
        setPercent(Percent + 10)
      }
      else {
        setContent(data)
      }
    }

  }

  return (
    <React.Fragment>
      <SharedElement id={`item.${todo.index}.photo`}>
        <CachedImage
          source={{ uri: `${todo.imageUrl}` }}
          cacheKey={`${todo.index}t`}
          resizeMode='cover'
          style={[styles.appBar, { paddingTop: insets.top }]}
        />
      </SharedElement>
      <Toolbar appearance="control" onBackPress={props.navigation.goBack} />

      <Layout style={styles.container}>
        <View style={styles.detailsContainer}>
          <SharedElement id={`item.${todo.index}.text`}>
            <Text style={styles.title} category="h4">
              {todo.title}
            </Text>
          </SharedElement>
          <Text appearance="hint" category="c1">
            {todo.author}
          </Text>
          <ProgressBar
            style={styles.progressBar}
            progress={Percent}
            text={`${Percent}%`}
          />
          <ScrollView>
            <Text style={styles.content}>{Content}{Percent != 0 && Percent < 100 ? <Text onPress={() => ParcentData()} style={{ color: 'sky blue' }}>...more</Text> : null}</Text>
          </ScrollView>
        </View>
        <Button onPress={async () => {
          await AsyncStorage.clear()
          Notifications.dismissAllNotificationsAsync();
        }}>COMPLETE</Button>
      </Layout>
    </React.Fragment>
  );
};

TodoDetailsScreen.sharedElements = (navigation, otherNavigation, showing) => {
  const item = navigation.getParam('todo');
  return [
    {
      id: `item.${item.index}.photo`,
      animation: 'move',
      resize: 'clip'
    },
    {
      id: `item.${item.index}.title`,
      animation: 'move',
      resize: 'clip'
    }];
};
export default TodoDetailsScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  appBar: {
    height: 192,
    width: '100%'
  },
  title: {
    marginVertical: 4,
  },
  content: {
    textAlign: "justify",
    marginVertical: 4,
  },
  progressBar: {
    width: "50%",
    marginVertical: 16,
  },
});
