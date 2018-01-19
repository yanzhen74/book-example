from django.shortcuts import redirect, render
from django.http import HttpResponse
from lists.forms import ExistingListItemForm, ItemForm, NewListForm
from lists.models import Item, List
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your views here.
def home_page(request):
    return render(request, 'home.html', {'form': ItemForm()})


def view_list(request, list_id):
    list_ = List.objects.get(id=list_id)
    form = ExistingListItemForm(for_list=list_)
    if request.method == 'POST':
        form = ExistingListItemForm(for_list=list_, data=request.POST)
        if form.is_valid():
            form.save()
            return redirect(list_)
    return render(request, 'list.html', {'list': list_, "form": form})

def view_share(request, list_id):
    list_ = List.objects.get(id=list_id)
    list_.shared_with.add(request.POST['sharee'])
    return redirect(List.objects.get(id=list_id))

def new_list(request):
    form = NewListForm(data=request.POST)
    if form.is_valid():
        list_ = form.save(owner=request.user)
        return redirect(list_)
    return render(request, 'home.html', {'form': form})


# def add_item(request, list_id):
#     list_ = List.objects.get(id=list_id)
#     Item.objects.create(text=request.POST['item_text'], list=list_)
#     return redirect('/lists/%d/' % (list_.id,))
#

def my_lists(request, email):
    owner = None
    try:
        owner = User.objects.get(email=email)
    except Exception:
        pass
    return render(request, 'my_lists.html', {'owner': owner})
