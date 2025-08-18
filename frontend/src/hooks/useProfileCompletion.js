import { useSelector } from 'react-redux'

/**
 * Custom hook to check if client profile is complete
 * @returns {boolean} true if profile is complete, false otherwise
 */
export const useProfileCompletion = () => {
  const { profile } = useSelector((state) => state.client)
  
  // For debugging - log the current profile state
  console.log('Profile completion check:', {
    profileExists: !!profile,
    profile_id: profile?.id,
    full_profile: profile
  })
  
  // If profile exists (API returned 200), then it's complete
  const isProfileComplete = !!profile

  return {
    isProfileComplete,
    profile
  }
}

export default useProfileCompletion
