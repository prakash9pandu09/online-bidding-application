import { Triangle } from 'iconoir-react';
import { Link } from 'react-router-dom';
type Props = {
    title: string;
    titleColor: string;
}

const AppTitle = ({title, titleColor}: Props) => {
  return (
    <Link to='/' style={{display: 'flex', gap: '4px'}}>
        <Triangle height={36} width={36} strokeWidth={4} color='dodgerblue' style={{transform: 'rotate(180deg)'}}/>
        <span style={{fontSize: 'large', fontWeight: '600', color: titleColor}}>{title}</span>
    </Link>
  )
}

export default AppTitle