import {useNavigate} from 'react-router-dom';

import {AppGroup} from '../../api/apiSchemas';
import AppIcon from '@mui/icons-material/AppShortcut';
import AvatarButton from '../../components/AvatarButton';

export default function AppLink({group}: {group: AppGroup}) {
  const navigate = useNavigate();
  const deleted = group.app?.deleted_at != null;
  const handleClick = deleted ? undefined : () => navigate(`/apps/${group.app?.name}`);
  return <AvatarButton icon={<AppIcon />} text={group.app?.name} strikethrough={deleted} onClick={handleClick} />;
}
