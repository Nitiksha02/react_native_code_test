import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import { TodoTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import {
  TodoDetailsRouteParams,
  // TodoDetailsScreen,
  TodoDoneScreen,
  TodoInProgressScreen,
  TodoTabBar,
} from '../scenes/todo';
import { DoneAllIcon, GridIcon } from '../assets/icons';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import TodoDetailsScreen from '../scenes/todo/todo-details.component';

type TodoNavigatorParams = {
  [AppRoute.TODO]: undefined;
  [AppRoute.TODO_DETAILS]: TodoDetailsRouteParams;
}

type TodoTabsNavigatorParams = {
  [AppRoute.TODO_IN_PROGRESS]: undefined;
  [AppRoute.TODO_DONE]: undefined;
}

export type TodoScreenProps = MaterialTopTabBarProps & {
  navigation: TodoTabNavigationProp;
}

export interface TodoInProgressScreenProps {
  navigation: CompositeNavigationProp<
    TodoTabNavigationProp & StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<TodoTabsNavigatorParams, AppRoute.TODO_IN_PROGRESS>>;
  route: RouteProp<TodoTabsNavigatorParams, AppRoute.TODO_IN_PROGRESS>;
}

export interface TodoDoneScreenProps {
  navigation: CompositeNavigationProp<
    TodoTabNavigationProp & StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<TodoTabsNavigatorParams, AppRoute.TODO_DONE>>;
  route: RouteProp<TodoTabsNavigatorParams, AppRoute.TODO_DONE>;
}

export interface TodoDetailsScreenProps {
  navigation: StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>;
  route: RouteProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>;
}

// const Stack = createStackNavigator<TodoNavigatorParams>();
const TopTab = createMaterialTopTabNavigator<TodoTabsNavigatorParams>();
const Stack = createSharedElementStackNavigator<TodoNavigatorParams>()

const TodoTabsNavigator = (): React.ReactElement => (
  // @ts-ignore: `tabBar` also contains a DrawerNavigationProp & BottomTabNavigationProp
  <TopTab.Navigator tabBar={props => <TodoTabBar {...props} />}>
    <TopTab.Screen
      name={AppRoute.TODO_IN_PROGRESS}
      component={TodoInProgressScreen}
      options={{ title: 'IN PROGRESS', tabBarIcon: GridIcon }}
    />
    <TopTab.Screen
      name={AppRoute.TODO_DONE}
      component={TodoDoneScreen}
      options={{ title: 'DONE', tabBarIcon: DoneAllIcon }}
    />
  </TopTab.Navigator>
);

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress
      }
    };
  }
};

export const TodoNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.TODO} component={TodoTabsNavigator} />
    <Stack.Screen name={AppRoute.TODO_DETAILS} options={() => options} component={TodoDetailsScreen} sharedElementsConfig={(route, otherRoute, showing) => {
      const { todo } = route.params;
      console.log("todo", todo)
      return [
        {
          id: `item.${todo.index}.photo`,
          animation: 'move',
          resize: 'clip'
        },
        {
          id: `item.${todo.index}.title`,
          animation: 'move',
          resize: 'clip'
        }
      ];
    }} />
  </Stack.Navigator>
);
