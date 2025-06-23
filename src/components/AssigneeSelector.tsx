import Image from 'next/image';

<Image src={user.avatar || ''} alt={user.name} width={20} height={20} className="w-5 h-5 rounded-full" />

<Image src={user.avatar || ''} alt={user.name} width={32} height={32} className="w-8 h-8 rounded-full"/> 