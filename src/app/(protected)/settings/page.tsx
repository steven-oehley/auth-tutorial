import { signOutUser } from "@/actions/sign-out";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <section className='p-4'>
      <div>{JSON.stringify(session)}</div>
      <form action={signOutUser}>
        <Button type='submit' className='mt-4 '>
          Sign out
        </Button>
      </form>
    </section>
  );
};
export default SettingsPage;
