import { useEffect, useState } from 'react';
import { ArConnect } from 'permawebjs/auth';

export const useConnected = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkInstallation = async () => {
      const walletInstalled = await ArConnect.isInstalled();
      if (walletInstalled) {
        setIsInstalled(true);

        try {
          await ArConnect.getActiveAddress();
          setIsConnected(true);
        } catch (error) {
          setIsConnected(false);
        }
      } else {
        setIsInstalled(false);
      }
    };

    checkInstallation();
  }, []);

  const connection = {
    isInstalled,
    isConnected,
  };

  return { isConnected, isInstalled };
};
