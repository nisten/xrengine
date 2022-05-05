import React from 'react'
import { useTranslation } from 'react-i18next'

import { LocationAction, useLocationState } from '@xrengine/client-core/src/social/services/LocationService'
import { useDispatch } from '@xrengine/client-core/src/store'
import { useAuthState } from '@xrengine/client-core/src/user/services/AuthService'
import { useHookEffect } from '@xrengine/hyperflux'

import { retrieveLocationByName } from './LocationLoadHelper'

export const LoadLocationScene = () => {
  const { t } = useTranslation()
  const authState = useAuthState()
  const locationState = useLocationState()
  const isUserBanned = locationState.currentLocation.selfUserBanned.value
  const dispatch = useDispatch()

  /**
   * Once we have logged in, retrieve the location data
   */
  useHookEffect(() => {
    console.log('authState.isLoggedIn or locationState.locationName changed', authState.isLoggedIn, locationState.locationName)
    const selfUser = authState.user
    console.log('selfUser', selfUser)
    const currentLocation = locationState.currentLocation.location
    console.log('currentLocation', currentLocation)

    const isUserBanned =
      selfUser?.locationBans?.value?.find((ban) => ban.locationId === currentLocation.id.value) != null
    console.log('isUserBanned', isUserBanned)
    dispatch(LocationAction.socialSelfUserBanned(isUserBanned))

    console.log('isUserBanned, fetchingCurrentLocation, locationName', isUserBanned, locationState.fetchingCurrentLocation, locationState.locationName.value)
    if (!isUserBanned && !locationState.fetchingCurrentLocation.value && locationState.locationName.value) {
      console.log('Calling retrieveLocationByName')
      retrieveLocationByName(authState, locationState.locationName.value)
    }
  }, [authState.isLoggedIn, locationState.locationName])

  if (isUserBanned) return <div className="banned">{t('location.youHaveBeenBannedMsg')}</div>

  return <> </>
}

export default LoadLocationScene
