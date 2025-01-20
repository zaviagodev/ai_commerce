import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '../data/members';
import { Header } from '../components/member-details/header';
import { BasicInfo } from '../components/member-details/sections/basic-info';
import { RolePermissions } from '../components/member-details/sections/role-permissions';

export default function MemberDetailsPage() {
  const { id } = useParams();
  const [showActions, setShowActions] = useState(false);
  const member = TEAM_MEMBERS.find((m) => m.id === id);

  if (!member) {
    return <div className="pt-14">Member not found</div>;
  }

  const handleRoleChange = (role: string) => {
    // Handle role change
    console.log('Role changed to:', role);
  };

  return (
    <div className="flex h-screen flex-col">
      <motion.form 
        className="flex flex-col h-full" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.3 }}
      >
        <Header 
          member={member} 
          onShowActions={() => setShowActions(true)} 
        />

        <motion.div
          className="flex-1 overflow-y-auto move-top"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="h-full">
            <div className="max-w-4xl mx-auto space-y-8 pl-0 pr-6 py-8 relative">
              <BasicInfo member={member} />
              <RolePermissions 
                member={member}
                onRoleChange={handleRoleChange}
              />
              {/* Add other sections as needed */}
            </div>
          </div>
        </motion.div>
      </motion.form>
    </div>
  );
}