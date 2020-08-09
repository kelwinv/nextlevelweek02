import { StatusBar } from 'expo-status-bar';
import React from 'react';

import AppStack from './src/routes/AppStack'

export default function App() {
  return (
    <>
      <AppStack />
      <StatusBar style="light" />
    </>
  );
}