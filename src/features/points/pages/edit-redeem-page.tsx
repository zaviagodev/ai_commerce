import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RedeemForm } from "../components/redeem-form";
import { useRedeems } from "../hooks/use-redeems";
import { Printer } from "lucide-react";

export function EditRedeemPage() {
  const { id } = useParams();
  const { redeems } = useRedeems();
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const redeem = redeems.find((r) => r.id === id);

  if (!redeem) {
    return <div>Redeem not found</div>;
  }

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm("Are you sure? Any unsaved changes will be lost.")) {
        setIsEditing(false);
        setHasChanges(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline">
        <Printer className="mr-2 h-4 w-4" />
        Print Receipt
      </Button>
      {!isEditing ? (
        <Button
          onClick={() => setIsEditing(true)}
          variant="default"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Edit Redeem
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!hasChanges}
            className="bg-green-600 hover:bg-green-700"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <RedeemForm
      initialData={redeem}
      isEditing={isEditing}
      headerActions={headerActions}
      onFieldChange={() => setHasChanges(true)}
    />
  );
}
