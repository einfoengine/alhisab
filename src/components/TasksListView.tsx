import Image from 'next/image';

user && <Image key={user.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={user.avatar} alt={user.name} title={user.name} width={32} height={32} /> 