import type { Announcement } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { usePrivacy } from '@/contexts/PrivacyContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface AnnouncementsProps {
  announcements: Announcement[];
  onAnnouncementClick: (announcement: Announcement) => void;
}

export function Announcements({ announcements, onAnnouncementClick }: AnnouncementsProps) {
  const { anonymizeName } = usePrivacy();
  const { t } = useLanguage();
  return (
    <div className="px-4 md:px-0 space-y-3">
      {announcements.length > 0 ? (
        announcements.map(announcement => (
          <Card
            key={announcement.id}
            className="cursor-pointer transition-all hover:bg-card/80 hover:shadow-md"
            onClick={() => onAnnouncementClick(announcement)}
          >
            <CardContent className="p-4 space-y-2">
              <p className="font-bold text-base truncate">{announcement.title}</p>
               <p className="text-sm text-muted-foreground line-clamp-2">
                {announcement.content}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground/80 pt-2">
                  <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5"/>
                      <span>{anonymizeName(announcement.author)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5"/>
                      <span>{announcement.date}</span>
                  </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="bg-card/50">
          <CardContent className="p-8 text-center text-muted-foreground">
            <p>{t('announcements.noAnnouncements')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
