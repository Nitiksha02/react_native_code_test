import React, { useState, useEffect, useRef } from 'react';
import { ListRenderItemInfo, Image, Platform, Button, View, AsyncStorage, AppState } from 'react-native';
import {
  Input,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { TodoInProgressScreenProps } from '../../navigation/todo.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { ProgressBar } from '../../components/progress-bar.component';
import { SearchIcon } from '../../assets/icons';
import { Todo } from '../../data/todo.model';
import blogArray from '../../data/blogdata';
import CachedImage from "../../components/cachedImage";
import * as Notifications from 'expo-notifications';
import { SharedElement } from 'react-navigation-shared-element';

export const TodoInProgressScreen = (props: TodoInProgressScreenProps): ListElement => {
  //alert(blogArray);
  let Bdata = blogArray;
  const [todos, setTodos] = React.useState<Todo[]>(Bdata);
  const [query, setQuery] = React.useState<string>('');
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    AsyncStorage.getItem('Todo')
      .then(res => {
        if (res) {
          let data = JSON.parse(res)
          Bdata[data.index].progress = data.progress
        }
      })
    console.log("appState", AppState.currentState)
    Notifications.addNotificationReceivedListener(async ({ request }) => {
      if (request && request.content) {
        props.navigation.navigate(AppRoute.TODO_DETAILS, { todo: request.content.data });
      }
      console.log("notificationnotification", request)
      await AsyncStorage.clear()
      Notifications.cancelAllScheduledNotificationsAsync()
    });
    return () => {
    };
  }, []);

  const onChangeQuery = (query: string): void => {
    const nextTodos: Todo[] = Bdata.filter((todo: Todo): boolean => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
    setTodos(nextTodos);
    setQuery(query);
  };

  const navigateTodoDetails = async (todoIndex: number) => {
    const { [todoIndex]: todo } = todos;
    if (todo.progress < 70) {
      await AsyncStorage.setItem('Notification', JSON.stringify(todo))
    }
    props.navigation.navigate(AppRoute.TODO_DETAILS, { todo });
  };

  const renderTodo = ({ item, index }: ListRenderItemInfo<Todo>): ListItemElement => (
    <ListItem
      style={styles.item}
      onPress={() => navigateTodoDetails(index)}>
      <SharedElement style={{ width: '100%' }} id={`item.${index}.photo`}>
        <CachedImage
          source={{ uri: `${item.imageUrl}` }}
          cacheKey={`${item.index}t`}
          resizeMode='cover'
          style={styles.cardimg}
        />
      </SharedElement>
      <SharedElement id={`item.${index}.text`}>
        <Text category='s1'>
          {item.title}
        </Text>
      </SharedElement>
      <Text
        appearance='hint'
        category='c1'>
        {item.author}
      </Text>
      <ProgressBar
        style={styles.itemProgressBar}
        progress={item.progress}
        text={`${item.progress}%`}
      />
    </ListItem>
  );

  return (
    <Layout style={styles.container}>
      {/* <Input
        style={styles.filterInput}
        placeholder='Search'
        value={query}
        accessoryLeft={SearchIcon}
        onChangeText={onChangeQuery}
      /> */}
      <List
        style={styles.list}
        data={Bdata}
        renderItem={renderTodo}
      />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  filterInput: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  list: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'background-basic-color-1',
  },
  cardimg: {
    height: 100,
    width: "100%",
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    marginBottom: 34,
    borderRadius: 10,
    border: 1,
    borderColor: "#CCC",
    backgroundColor: "#EEE"
  },
  itemProgressBar: {
    width: '90%',
    marginVertical: 12,
  },
});


