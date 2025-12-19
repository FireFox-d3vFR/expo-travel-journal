import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserProfileProvider } from '@/hooks/use-user-profile';
import { useTranslation } from '@/hooks/use-translation';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const { t } = useTranslation();

  return (
    <UserProfileProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarActiveTintColor: tint,
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarLabelStyle: {
            fontSize: 11,
          },
          tabBarStyle: {
            borderTopWidth: 0.5,
            borderTopColor: '#1F2933',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('tabs.trips'),
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={26}
                name={focused ? 'house.fill' : 'house'}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: t('tabs.explore'),
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={26}
                name={focused ? 'paperplane.fill' : 'paperplane'}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: t('tabs.profile'),
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={26}
                name={focused ? 'person.fill' : 'person'}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: t('tabs.settings'),
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={26}
                name={focused ? 'gearshape.fill' : 'gearshape'}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </UserProfileProvider>
  );
}