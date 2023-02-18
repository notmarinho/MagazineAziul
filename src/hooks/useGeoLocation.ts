import {useEffect, useState} from 'react';
import type {AlertButton} from 'react-native';
import {Platform} from 'react-native';
import {Alert, Linking} from 'react-native';
import Geolocation, {PositionError} from 'react-native-geolocation-service';
import {check, PERMISSIONS, request} from 'react-native-permissions';

const cancelAlertButton: AlertButton = {
  text: 'Cancel',
  onPress: () => console.log('Cancel Pressed'),
  style: 'cancel',
};

const goToSettingsAlertButton: AlertButton = {
  text: 'Settings',
  onPress: () => Linking.openSettings(),
};

const useGeoLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserPosition, setCurrentUserPosition] =
    useState<Geolocation.GeoPosition | null>(null);

  const hasUserPosition = currentUserPosition !== null;

  const getCurrentPosition = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    });
  };

  const alertToSettings = () => {
    Alert.alert(
      'Location services are unavailable',
      'Please enable location services in your settings',
      [cancelAlertButton, goToSettingsAlertButton],
    );
    setIsLoading(false);
  };

  const onSuccess = (position: Geolocation.GeoPosition) => {
    setCurrentUserPosition(position);
    setIsLoading(false);
  };

  const onError = async (error: Geolocation.GeoError) => {
    if (error.code === PositionError.PERMISSION_DENIED) {
      Platform.OS === 'ios'
        ? requestPermissionIos()
        : requestPermissionAndroid();
    }
  };

  const requestPermissionIos = () => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      switch (result) {
        case 'granted':
          getCurrentPosition();
          break;
        case 'blocked':
        case 'unavailable':
        case 'limited':
        case 'denied':
          alertToSettings();
      }
    });
  };

  const requestPermissionAndroid = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      console.log(result);

      switch (result) {
        case 'granted':
          getCurrentPosition();
          break;
        case 'blocked':
        case 'unavailable':
        case 'limited':
        case 'denied':
          alertToSettings();
      }
    });
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return {
    currentUserPosition,
    isLoading,
    hasUserPosition,
  };
};

export default useGeoLocation;
