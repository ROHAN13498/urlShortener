import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AxiosInstance from "@/utils/axios";
import { toast } from "sonner";
import { usePathname } from 'next/navigation';

const formSchema = z.object({
  longUrl: z.string().url({ message: "Please enter a valid URL" }),
  shortUrl: z.string().min(1, { message: "ShortUrl is required" }),
  expirationDate: z.string().optional(),
  expirationTime: z.string().optional()
});

const CreateLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const workspace = usePathname().split("/")[2];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longUrl: "",
      shortUrl: "",
      expirationDate: "",
      expirationTime: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res=await AxiosInstance.post("/api/user/createlink", { ...values, workspace });
      toast.success("Link Shortened");
      console.log(res.data.message,res.data.link);
      form.reset();
    } catch (error) {
      toast.error("Error creating link");
    } finally {
      setIsOpen(false);
    }
  }
  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Link</DialogTitle>
          <DialogDescription>
            Enter the details to create a new short link.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="longUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/very/long/url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short URL</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">example.com/</span>
                      <Input placeholder="short-link" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Date (optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expirationTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Time (optional)</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Create Link</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
