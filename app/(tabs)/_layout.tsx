import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SettingsProvider } from '@/hooks/use-settings';
import { UserProfileProvider } from '@/hooks/use-user-profile';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  return (
    <SettingsProvider>
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
              title: 'Voyages',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={26} name='house.fill' color={color}/>
              ),
            }}
          />

          <Tabs.Screen
            name="explore"
            options={{
              title: 'Explorer',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={26} name='paperplane.fill' color={color}/>
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profil',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={26} name='person.fill' color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              title: 'Réglages',
              tabBarIcon: ({ color, focused }) => (
                <IconSymbol 
                  size={26} 
                  name={focused ? 'gearshape.fill' : 'gearshape' } 
                  color={color} />
              ),
            }}
          />
        </Tabs>
      </UserProfileProvider>
    </SettingsProvider>
  );
}
